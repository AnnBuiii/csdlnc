const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const compression = require('compression');
const rateLimit  = require('express-rate-limit');

const authRoutes        = require('./routes/auth.routes');
const candidateRoutes   = require('./routes/candidate.routes');
const companyRoutes     = require('./routes/company.routes');
const jobRoutes         = require('./routes/job.routes');
const applicationRoutes = require('./routes/application.routes');
const interviewRoutes   = require('./routes/interview.routes');
const recommendRoutes   = require('./routes/recommend.routes');
const reviewRoutes      = require('./routes/review.routes');
const analyticsRoutes   = require('./routes/analytics.routes');
const notificationRoutes = require('./routes/notification.routes');

const errorHandler = require('./middlewares/errorHandler');
const logger = require('./config/logger');

const app = express();

// ── Security middlewares ──────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));

// ── Rate limiting ─────────────────────────────────────────────
app.use('/api/', rateLimit({
  windowMs: 60 * 1000,      // 1 phút
  max: 100,
  message: { success: false, message: 'Quá nhiều request, vui lòng thử lại sau.' },
}));

// ── General middlewares ───────────────────────────────────────
app.use(compression());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', {
  stream: { write: (msg) => logger.http(msg.trim()) },
}));

// ── Health check ──────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── API Routes ────────────────────────────────────────────────
app.use('/api/auth',          authRoutes);
app.use('/api/candidates',    candidateRoutes);
app.use('/api/companies',     companyRoutes);
app.use('/api/jobs',          jobRoutes);
app.use('/api/applications',  applicationRoutes);
app.use('/api/interviews',    interviewRoutes);
app.use('/api/recommendations', recommendRoutes);
app.use('/api/reviews',       reviewRoutes);
app.use('/api/analytics',     analyticsRoutes);
app.use('/api/notifications', notificationRoutes);

// ── 404 handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint không tồn tại.' });
});

// ── Global error handler ──────────────────────────────────────
app.use(errorHandler);

module.exports = app;
