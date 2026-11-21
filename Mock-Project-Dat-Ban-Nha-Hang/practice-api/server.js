// Local-only training API for the fictional reservation case study.
// Uses in-memory sample data and a fake staff header. Never use for real customer data.
const http = require('node:http');

const HOST = '127.0.0.1';
const PORT = Number(process.env.PORT || 3000);
const slots = new Map([
  ['2026-12-05T19:00:00+07:00', { capacity: 10, isOpen: true }],
  ['2026-12-05T19:30:00+07:00', { capacity: 8, isOpen: true }],
  ['2026-12-05T20:00:00+07:00', { capacity: 0, isOpen: false }],
]);
let nextId = 1001;
let reservations = [
  { id: 1, reservationCode: 'RSV-DEMO-001', customerName: 'Nguyen An (sample)', phone: '0900000000', email: 'an@example.test', partySize: 4, startAt: '2026-12-05T19:00:00+07:00', status: 'PENDING', note: '', createdAt: '2026-11-20T10:00:00+07:00', reason: null },
  { id: 2, reservationCode: 'RSV-DEMO-002', customerName: 'Tran Binh (sample)', phone: '0900000001', email: null, partySize: 2, startAt: '2026-12-05T19:00:00+07:00', status: 'CONFIRMED', note: '', createdAt: '2026-11-20T10:10:00+07:00', reason: null },
  { id: 3, reservationCode: 'RSV-DEMO-003', customerName: 'Le Chi (sample)', phone: null, email: 'chi@example.test', partySize: 3, startAt: '2026-12-05T19:30:00+07:00', status: 'REJECTED', note: '', createdAt: '2026-11-20T10:20:00+07:00', reason: 'Sample rejection' },
  { id: 4, reservationCode: 'RSV-DEMO-004', customerName: 'Pham Vy (sample)', phone: '0900000002', email: null, partySize: 2, startAt: '2026-12-05T19:30:00+07:00', status: 'PENDING', note: '', createdAt: '2026-11-20T10:30:00+07:00', reason: null },
];
const history = reservations.map(r => ({ reservationCode: r.reservationCode, oldStatus: null, newStatus: 'PENDING', changedBy: null, changedAt: r.createdAt, reason: null }));
history.push({ reservationCode: 'RSV-DEMO-002', oldStatus: 'PENDING', newStatus: 'CONFIRMED', changedBy: 1, changedAt: '2026-11-20T10:15:00+07:00', reason: null });
history.push({ reservationCode: 'RSV-DEMO-003', oldStatus: 'PENDING', newStatus: 'REJECTED', changedBy: 2, changedAt: '2026-11-20T10:25:00+07:00', reason: 'Sample rejection' });

function send(res, status, data) {
  const body = JSON.stringify(data, null, 2);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(body), 'Cache-Control': 'no-store' });
  res.end(body);
}
function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1024 * 1024) reject(Object.assign(new Error('Request body too large'), { status: 413, code: 'BODY_TOO_LARGE' }));
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try { resolve(JSON.parse(body)); }
      catch { reject(Object.assign(new Error('Body must be valid JSON'), { status: 400, code: 'INVALID_JSON' })); }
    });
    req.on('error', reject);
  });
}
function staffId(req) {
  if (req.headers['x-training-staff'] !== 'demo') return null;
  return 1;
}
function occupiedSeats(startAt) {
  return reservations.filter(r => r.startAt === startAt && ['PENDING', 'CONFIRMED'].includes(r.status)).reduce((sum, r) => sum + r.partySize, 0);
}
function validationError(fields) {
  return { code: 'VALIDATION_ERROR', message: 'Please correct the highlighted fields.', fields };
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`);
  const path = url.pathname;
  try {
    if (req.method === 'GET' && path === '/api/health') return send(res, 200, { status: 'ok', mode: 'training-mock', persistence: 'in-memory' });

    if (req.method === 'POST' && path === '/api/reservations') {
      const input = await readJson(req);
      const fields = {};
      if (typeof input.customerName !== 'string' || !input.customerName.trim()) fields.customerName = 'REQUIRED';
      if (!Number.isInteger(input.partySize) || input.partySize < 1) fields.partySize = 'MUST_BE_POSITIVE_INTEGER';
      if (!input.phone && !input.email) fields.contact = 'PHONE_OR_EMAIL_REQUIRED';
      if (input.phone && !/^\+?[0-9 ()-]{8,20}$/.test(input.phone)) fields.phone = 'INVALID_FORMAT';
      if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) fields.email = 'INVALID_FORMAT';
      if (typeof input.startAt !== 'string' || Number.isNaN(Date.parse(input.startAt)) || !/(Z|[+-]\d{2}:\d{2})$/.test(input.startAt)) fields.startAt = 'ISO_8601_WITH_TIMEZONE_REQUIRED';
      if (Object.keys(fields).length) return send(res, 400, validationError(fields));

      const slot = slots.get(input.startAt);
      const used = occupiedSeats(input.startAt);
      const availableSeats = slot && slot.isOpen ? Math.max(0, slot.capacity - used) : 0;
      if (!slot || !slot.isOpen || input.partySize > availableSeats) {
        return send(res, 409, { code: 'SLOT_UNAVAILABLE', message: 'The selected time is unavailable.', availableSeats });
      }
      const datePart = input.startAt.slice(0, 10).replaceAll('-', '');
      const reservationCode = `RSV-${datePart}-${String(nextId).slice(-4)}`;
      const reservation = {
        id: nextId++, reservationCode, customerName: input.customerName.trim(),
        phone: input.phone || null, email: input.email || null, partySize: input.partySize,
        startAt: input.startAt, status: 'PENDING', note: input.note || '',
        createdAt: new Date().toISOString(), reason: null,
      };
      reservations.push(reservation);
      history.push({ reservationCode, oldStatus: null, newStatus: 'PENDING', changedBy: null, changedAt: reservation.createdAt, reason: null });
      return send(res, 201, { reservationCode, status: 'PENDING', message: 'Request received. The restaurant must still confirm it.' });
    }

    if (req.method === 'GET' && path === '/api/reservations') {
      if (!staffId(req)) return send(res, 401, { code: 'STAFF_AUTH_REQUIRED', message: 'Training staff header is required.' });
      let result = reservations;
      if (url.searchParams.has('status')) result = result.filter(r => r.status === url.searchParams.get('status').toUpperCase());
      if (url.searchParams.has('date')) result = result.filter(r => r.startAt.startsWith(url.searchParams.get('date')));
      if (url.searchParams.has('code')) result = result.filter(r => r.reservationCode === url.searchParams.get('code'));
      if (url.searchParams.has('name')) result = result.filter(r => r.customerName.toLowerCase().includes(url.searchParams.get('name').toLowerCase()));
      return send(res, 200, { items: result.map(({ id, customerName, phone, email, partySize, startAt, status, reservationCode, createdAt, reason }) => ({ id, reservationCode, customerName, phone, email, partySize, startAt, status, createdAt, reason })), total: result.length });
    }

    const decisionMatch = path.match(/^\/api\/reservations\/([^/]+)\/decision$/);
    if (req.method === 'PATCH' && decisionMatch) {
      const changedBy = staffId(req);
      if (!changedBy) return send(res, 401, { code: 'STAFF_AUTH_REQUIRED', message: 'Training staff header is required.' });
      const input = await readJson(req);
      const reservation = reservations.find(r => r.reservationCode === decodeURIComponent(decisionMatch[1]));
      if (!reservation) return send(res, 404, { code: 'RESERVATION_NOT_FOUND', message: 'Reservation was not found.' });
      if (reservation.status !== 'PENDING') return send(res, 409, { code: 'STATUS_CONFLICT', message: 'Only PENDING reservations can be decided.' });
      if (!['CONFIRM', 'REJECT'].includes(input.decision)) return send(res, 400, validationError({ decision: 'MUST_BE_CONFIRM_OR_REJECT' }));
      if (input.decision === 'REJECT' && (typeof input.reason !== 'string' || !input.reason.trim())) return send(res, 400, validationError({ reason: 'REQUIRED_FOR_REJECTION' }));
      const oldStatus = reservation.status;
      reservation.status = input.decision === 'CONFIRM' ? 'CONFIRMED' : 'REJECTED';
      reservation.reason = input.reason || null;
      const changedAt = new Date().toISOString();
      history.push({ reservationCode: reservation.reservationCode, oldStatus, newStatus: reservation.status, changedBy, changedAt, reason: reservation.reason });
      const notificationStatus = req.headers['x-simulate-email-failure'] === 'true' ? 'FAILED_SIMULATED' : 'SENT_SIMULATED';
      return send(res, 200, { reservationCode: reservation.reservationCode, oldStatus, status: reservation.status, changedBy, changedAt, reason: reservation.reason, notificationStatus, notice: 'No email was actually sent.' });
    }

    const historyMatch = path.match(/^\/api\/reservations\/([^/]+)\/history$/);
    if (req.method === 'GET' && historyMatch) {
      if (!staffId(req)) return send(res, 401, { code: 'STAFF_AUTH_REQUIRED', message: 'Training staff header is required.' });
      const code = decodeURIComponent(historyMatch[1]);
      if (!reservations.some(r => r.reservationCode === code)) return send(res, 404, { code: 'RESERVATION_NOT_FOUND', message: 'Reservation was not found.' });
      return send(res, 200, { items: history.filter(h => h.reservationCode === code) });
    }

    return send(res, 404, { code: 'ROUTE_NOT_FOUND', message: 'No training route matches this request.' });
  } catch (error) {
    return send(res, error.status || 500, { code: error.code || 'INTERNAL_ERROR', message: error.status ? error.message : 'Unexpected training mock error.' });
  }
});

server.listen(PORT, HOST, () => console.log(`Reservation training API listening at http://${HOST}:${PORT}`));




