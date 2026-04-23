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

// ── API Documentation ─────────────────────────────────────────
app.get('/docs', (req, res) => {
  res.redirect('/docs.html');
});

app.get('/docs.html', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>API Documentation - Smart Recruitment System</title>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
            .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #333; border-bottom: 3px solid #4CAF50; padding-bottom: 10px; }
            h2 { color: #555; margin-top: 30px; }
            .endpoint { background: #f9f9f9; border-left: 4px solid #4CAF50; padding: 15px; margin: 15px 0; border-radius: 4px; }
            .method { display: inline-block; padding: 5px 10px; border-radius: 3px; color: white; font-weight: bold; margin-right: 10px; }
            .get { background: #28a745; }
            .post { background: #007bff; }
            .put { background: #ffc107; color: black; }
            .delete { background: #dc3545; }
            .patch { background: #6f42c1; }
            .url { font-family: monospace; background: #f0f0f0; padding: 2px 6px; border-radius: 3px; }
            code { background: #f0f0f0; padding: 2px 4px; border-radius: 3px; font-family: monospace; }
            .note { background: #e3f2fd; border-left: 4px solid #2196F3; padding: 10px; margin: 15px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>📚 Smart Recruitment System - API Documentation</h1>
            
            <div class="note">
                <strong>📋 OpenAPI Specification:</strong> 
                <a href="/openapi.yaml" target="_blank">openapi.yaml</a> |
                <a href="https://editor.swagger.io/?url=http://localhost:8000/openapi.yaml" target="_blank">Open in Swagger Editor</a>
            </div>
            
            <h2>🔐 Authentication</h2>
            <p>Tất cả API endpoints cần authentication (trừ các endpoint public) phải gửi token JWT trong header:</p>
            <code>Authorization: Bearer &lt;token&gt;</code>
            
            <h2>🚀 Key Endpoints</h2>
            
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="url">/api/auth/register/candidate</span>
                <p>Đăng ký ứng viên mới</p>
                <p><strong>Body:</strong> <code>{ email, password, fullName }</code></p>
            </div>
            
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="url">/api/auth/register/recruiter</span>
                <p>Đăng ký nhà tuyển dụng mới</p>
                <p><strong>Body:</strong> <code>{ email, password, companyName }</code></p>
            </div>
            
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="url">/api/auth/login</span>
                <p>Đăng nhập hệ thống</p>
                <p><strong>Body:</strong> <code>{ email, password }</code></p>
            </div>
            
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="url">/api/jobs</span>
                <p>Tìm kiếm công việc (public)</p>
                <p><strong>Query params:</strong> <code>keyword, location, jobType, experience, page, limit</code></p>
            </div>
            
            <div class="endpoint">
                <span class="method post">POST</span>
                <span class="url">/api/applications</span>
                <p>Nộp đơn ứng tuyển (candidate only)</p>
                <p><strong>Body:</strong> <code>{ jobId, resumeUrl, coverLetter }</code></p>
            </div>
            
            <div class="endpoint">
                <span class="method get">GET</span>
                <span class="url">/api/recommendations/jobs</span>
                <p>Đề xuất công việc cho ứng viên</p>
                <p><strong>Query param:</strong> <code>limit</code> (default: 10)</p>
            </div>
            
            <h2>📊 Response Format</h2>
            <p>Tất cả responses có format chuẩn:</p>
            <pre>
{
  "success": boolean,
  "message": string,
  "data": object | array,
  "meta": object // cho pagination
}</pre>
            
            <h2>🔗 Useful Links</h2>
            <ul>
                <li><a href="https://editor.swagger.io/?url=http://localhost:8000/openapi.yaml" target="_blank">Interactive API Documentation</a></li>
                <li><a href="/openapi.yaml" target="_blank">Raw OpenAPI Specification</a></li>
                <li><a href="/health" target="_blank">Health Check</a></li>
            </ul>
        </div>
    </body>
    </html>
  `);
});

app.get('/openapi.yaml', (req, res) => {
  res.sendFile('/home/domixi/Dev/csdlnc/backend/openapi.yaml');
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
