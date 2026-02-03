# Dokumentasi Struktur Proyek CV. Tihani Mafaza

Dokumen ini menjelaskan seluruh struktur folder dan file dalam proyek Next.js ini, termasuk fungsi dan tujuan setiap komponen.

---

## Struktur Folder Utama

```
CV.Tihani-Mafaza-Next/
├── src/                          # Folder utama source code
├── public/                        # Asset statis (images, icons, dll)
├── node_modules/                  # Dependencies yang terinstall
├── .env.local                      # Environment variables lokal (jangan commit)
├── .gitignore                      # File yang diabaikan Git
├── next.config.mjs                # Konfigurasi Next.js
├── tsconfig.json                   # Konfigurasi TypeScript
├── tailwind.config.js             # Konfigurasi Tailwind CSS
├── package.json                    # Daftar dependencies dan scripts
├── STRUKTUR.md                     # Dokumentasi ini
└── README.md                       # Dokumentasi utama proyek

```

---

## Detail Struktur `/src`

### `/src/app`
Folder ini menggunakan **App Router** dari Next.js 16 dan berisi semua route aplikasi.

#### `/src/app/layout.tsx`
- **Fungsi**: Root layout untuk seluruh aplikasi
- **Isi**: Metadata, fonts, providers (NextAuth, Tailwind, dll)
- **Catatan**: Metadata SEO, Viewport configuration, Providers setup

#### `/src/app/globals.css`
- **Fungsi**: Global CSS styles untuk seluruh aplikasi
- **Isi**: Tailwind CSS directives, design tokens (CSS variables)
- **Catatan**: Berisi color palette, spacing, typography definitions

#### `/src/app/page.tsx`
- **Fungsi**: Homepage landing page
- **Isi**: Hero section, features, CTA buttons, testimonials
- **Catatan**: Public route, tidak memerlukan auth

#### `/src/app/guest/`
Folder untuk guest/anonymous users yang belum login

##### `/src/app/guest/layout.tsx`
- **Fungsi**: Layout untuk guest routes
- **Isi**: Navbar, Footer, Auth styling
- **Catatan**: Wrapper untuk public authentication pages

##### `/src/app/guest/auth/`
Folder untuk authentication pages

###### `/src/app/guest/auth/login/page.tsx`
- **Fungsi**: Halaman login untuk semua user
- **Isi**: LoginForm component, loading states
- **Fitur**: Email/password login, Google OAuth, CAPTCHA verification
- **Redirect**: Ke dashboard sesuai role (admin/staff/customer)

###### `/src/app/guest/auth/register/page.tsx`
- **Fungsi**: Halaman registrasi user baru
- **Isi**: RegisterForm component, benefits grid
- **Fitur**: Form validation, SVG CAPTCHA, Google OAuth signup
- **Redirect**: Ke login setelah sukses

#### `/src/app/admin/`
Folder untuk admin panel dan admin role features

##### `/src/app/admin/page.tsx`
- **Fungsi**: Admin portal gateway
- **Isi**: Card grid untuk pilih role (Admin/Staff/Customer)
- **Catatan**: Role-based dashboard selector

##### `/src/app/admin/layout.tsx`
- **Fungsi**: Layout untuk admin routes
- **Isi**: AdminSidebar, AdminHeader
- **Catatan**: Protected route, requires admin role

##### `/src/app/admin/dashboard/page.tsx`
- **Fungsi**: Admin main dashboard
- **Isi**: Summary stats cards, revenue charts, metrics
- **Fitur**: LineChart, BarChart dari Recharts
- **Data**: Orders, users, products, revenue tracking

##### `/src/app/admin/users/page.tsx`
- **Fungsi**: User management page
- **Isi**: Users table dengan search & filter
- **Fitur**: Filter by role (Admin/Staff/Customer), edit/delete actions
- **Data**: Full name, email, phone, company, role, status

##### `/src/app/admin/products/page.tsx`
- **Fungsi**: Product management page
- **Isi**: Products grid/table dengan kategori filter
- **Fitur**: Price display, stock indicators, rating display
- **Data**: Product name, category, price, stock, reviews

##### `/src/app/admin/orders/page.tsx`
- **Fungsi**: Orders management page
- **Isi**: Orders table dengan status tracking
- **Fitur**: Status badges, payment status, date formatting
- **Data**: Order number, customer, total, items, status, payment

##### `/src/app/admin/settings/page.tsx`
- **Fungsi**: Admin settings & configuration
- **Isi**: System settings, preferences, configurations
- **Catatan**: Untuk future implementation

#### `/src/app/staff/`
Folder untuk staff role features

##### `/src/app/staff/page.tsx`
- **Fungsi**: Staff dashboard untuk order approval
- **Isi**: Pending orders table, approved orders table
- **Fitur**: 
  - View pending orders yang memerlukan approval
  - Approve/reject buttons untuk setiap pesanan
  - Order detail modal dengan informasi lengkap
  - Status tracking untuk approved orders
  - Shipping status indicators
  - Invoice download functionality
- **Stats**: Total pending, approved orders, pending value, active customers
- **Catatan**: Staff dapat approve/reject pesanan dan manage shipment status

#### `/src/app/customer/`
Folder untuk customer role features

##### `/src/app/customer/dashboard/page.tsx`
- **Fungsi**: Customer dashboard
- **Isi**: Order history, quotation requests, account info
- **Catatan**: Untuk future implementation

##### `/src/app/customer/profile/page.tsx`
- **Fungsi**: Customer profile page
- **Isi**: Profile information, settings, preferences
- **Catatan**: Untuk future implementation

---

## `/src/components`
Folder untuk reusable React components

### `/src/components/guest/`
Components untuk guest/public pages

#### `/src/components/guest/layout/`
Layout components untuk guest pages

##### `Navbar.tsx`
- **Fungsi**: Navigation bar utama
- **Isi**: Logo, menu links, auth buttons, user dropdown
- **Fitur**: 
  - Responsive mobile menu dengan toggle
  - User session detection
  - Role-based navigation
  - Dropdown menu untuk user terlogin
  - Links ke login/register untuk guest users
- **Props**: None (menggunakan useSession dari NextAuth)

##### `Footer.tsx`
- **Fungsi**: Footer dengan company info
- **Isi**: Contact info, links, copyright, social media
- **Catatan**: Consistent di semua guest pages

#### `/src/components/guest/auth/`
Authentication related components

##### `LoginForm.tsx`
- **Fungsi**: Form untuk login
- **Isi**: Email input, password input, remember me checkbox, CAPTCHA, submit button
- **Fitur**:
  - Email validation
  - Password visibility toggle
  - SVG CAPTCHA verification
  - Google OAuth button dengan loading state
  - Error message display
  - Auto-redirect based on user role
- **State**: email, password, error, isLoading, captchaVerified, googleLoading

##### `RegisterForm.tsx`
- **Fungsi**: Form untuk registrasi user baru
- **Isi**: Full name, company, email, phone, password, confirm password, CAPTCHA, terms checkbox
- **Fitur**:
  - Form validation untuk semua fields
  - Password strength requirement (min 8 chars)
  - Password confirmation check
  - SVG CAPTCHA verification
  - Google OAuth signup button
  - Terms & conditions checkbox
  - Success redirect ke login
- **API**: POST /api/guest/auth/register

##### `SvgCaptcha.tsx`
- **Fungsi**: SVG CAPTCHA component untuk verifikasi
- **Isi**: SVG captcha display, input field, refresh button, verify button
- **Fitur**:
  - Dynamic SVG generation dari backend
  - Refresh button untuk generate ulang
  - 4-character input dengan validation
  - Uppercase conversion
  - Success/error message display
  - Verified state indication
- **API**: 
  - POST /api/guest/captcha/generate - Generate CAPTCHA
  - POST /api/guest/captcha/verify - Verify CAPTCHA answer

### `/src/components/admin/`
Components untuk admin dashboard

#### `/src/components/admin/shared/`
Shared admin components

##### `AdminSidebar.tsx`
- **Fungsi**: Sidebar navigation untuk admin panel
- **Isi**: Menu items, logo, user info, logout button
- **Fitur**:
  - Role-based menu (different menus untuk admin/staff/customer)
  - Active state indicators
  - Mobile toggle dengan overlay
  - Section-based menu organization
  - Nested submenu untuk categories
  - Logout functionality dengan signOut
  - Active link highlighting
- **Props**: `role: "admin" | "staff" | "customer" | "guest"`
- **Mobile**: Fixed sidebar dengan toggle button

##### `AdminHeader.tsx`
- **Fungsi**: Header untuk admin pages
- **Isi**: Page title, subtitle, search bar, notifications, user profile dropdown
- **Fitur**:
  - Dynamic title dan subtitle
  - Search functionality
  - Notification bell dengan badge
  - Message icon dengan badge
  - User profile dropdown dengan logout option
  - Responsive design
  - Sticky positioning
- **Props**: `title: string, subtitle?: string`

#### `/src/components/admin/admin/`
Admin-specific dashboard components

##### `AdminMetrics.tsx`
- **Fungsi**: Metrics/KPI cards untuk dashboard
- **Isi**: Revenue, orders count, active users, growth rate
- **Fitur**:
  - Trend indicators (up/down arrows)
  - Color-coded metrics
  - Icon dengan background color
  - Comparison vs previous period
  - Format untuk currency dan percentage
- **Data**: Total revenue, orders, active customers, YoY growth

#### `/src/components/admin/RoleLayout.tsx`
- **Fungsi**: Wrapper layout untuk role-based pages
- **Isi**: AdminSidebar, AdminHeader, content area
- **Fitur**:
  - Flex layout dengan sidebar + main content
  - Max-width container
  - Proper spacing dan padding
  - Scrollable content area
- **Props**: `role, title, subtitle, children`

---

## `/src/lib`
Utility functions dan constants

### `constants.ts`
- **Fungsi**: Central repository untuk constants
- **Isi**: 
  - `COLORS`: Color palette (primary, accent, gray, white)
  - `CONTACT`: Company contact information
  - Navigation menus
  - Feature lists
  - Status options
- **Usage**: Import di components untuk consistent branding

### `auth.ts`
- **Fungsi**: Export NextAuth configuration
- **Isi**: `auth`, `signIn`, `signOut` dari NextAuth route handler
- **Catatan**: Central authentication access point

### `prisma.ts`
- **Fungsi**: Prisma client instance
- **Isi**: Singleton Prisma client initialization
- **Catatan**: Prevent multiple Prisma instances di development

---

## `/src/hooks`
Custom React hooks

### `useSvgCaptcha.ts`
- **Fungsi**: Hook untuk manage SVG CAPTCHA state dan logic
- **Isi**: Generate, verify, state management
- **API Integration**: 
  - POST `/api/guest/captcha/generate` - Generate CAPTCHA
  - POST `/api/guest/captcha/verify` - Verify answer
- **Return**: `{ captchaData, userInput, isVerified, error, generateCaptcha, verifyCaptcha }`

### `use-mobile.ts`
- **Fungsi**: Hook untuk detect mobile screen size
- **Isi**: Responsive breakpoint detection
- **Return**: `boolean` - true jika layar < md breakpoint

---

## `/src/app/api`
API routes untuk backend operations

### `/src/app/api/guest/auth/[...nextauth]/`
NextAuth configuration dan handlers

#### `route.ts`
- **Fungsi**: NextAuth route handler
- **Providers**:
  - **GoogleProvider**: OAuth 2.0 login dengan Google
  - **CredentialsProvider**: Email/password login
- **Callbacks**:
  - `signIn`: Handle Google user creation dan credential validation
  - `jwt`: Add user data ke JWT token
  - `session`: Add token data ke session
  - `redirect`: Role-based redirect setelah login
- **Features**:
  - Auto-create user dari Google OAuth
  - Role assignment (default: customer untuk Google users)
  - Secure password comparison dengan bcryptjs
  - Session & JWT strategy
  - Secure cookies configuration
  - HTTPS-only cookies di production

### `/src/app/api/guest/captcha/`
CAPTCHA generation dan verification endpoints

#### `/generate/route.ts`
- **Fungsi**: Generate SVG CAPTCHA
- **Method**: POST
- **Return**: `{ svg: string, id: string }` - SVG content dan unique ID
- **Catatan**: Random 4-digit code embedded dalam SVG

#### `/verify/route.ts`
- **Fungsi**: Verify CAPTCHA answer
- **Method**: POST
- **Body**: `{ id: string, answer: string }`
- **Return**: `{ verified: boolean }` atau error message
- **Validation**: Case-insensitive comparison

### `/src/app/api/guest/auth/register/route.ts`
User registration endpoint

- **Fungsi**: Handle user registration
- **Method**: POST
- **Body**: 
  ```json
  {
    "fullName": string,
    "email": string,
    "phone": string,
    "companyName": string,
    "password": string
  }
  ```
- **Features**:
  - Password hashing dengan bcryptjs
  - Email uniqueness validation
  - Create user dengan default customer role
  - Return: User data atau error message

---

## Environment Variables (`.env.local`)

```
# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database (if using)
DATABASE_URL=your-database-url

# API Keys
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## Database Schema (Prisma Models)

Struktur database yang digunakan dalam aplikasi:

### Users Table
```
- id: UUID (primary key)
- email: String (unique)
- full_name: String
- avatar_url: String? (nullable)
- phone: String?
- company_name: String?
- password_hash: String?
- role_id: UUID (foreign key)
- is_active: Boolean
- email_verified: Boolean
- created_at: DateTime
- updated_at: DateTime
```

### Roles Table
```
- id: UUID (primary key)
- name: String (admin, staff, customer, guest)
- description: String?
```

### Orders Table
```
- id: UUID (primary key)
- user_id: UUID (foreign key)
- order_number: String (unique)
- total_amount: Decimal
- status: String (pending, approved, shipped, delivered)
- payment_status: String (pending, paid, failed)
- created_at: DateTime
- updated_at: DateTime
```

### Order Items Table
```
- id: UUID (primary key)
- order_id: UUID (foreign key)
- product_id: UUID (foreign key)
- quantity: Integer
- price: Decimal
```

### Products Table
```
- id: UUID (primary key)
- name: String
- description: String
- price: Decimal
- stock: Integer
- category: String
- image_url: String?
- is_active: Boolean
- created_at: DateTime
```

---

## Authentication Flow

### Login Process
1. User input email & password
2. User verify CAPTCHA
3. Submit LoginForm
4. NextAuth `credentials` provider validate password
5. Create JWT token dengan user data & role
6. Redirect sesuai role:
   - admin → `/admin/dashboard`
   - staff → `/staff/dashboard`
   - customer → `/customer/dashboard`

### Google OAuth Process
1. User click "Login/Register dengan Google"
2. Redirect ke Google OAuth consent screen
3. Google return authorization code
4. NextAuth exchange code untuk token
5. Check apakah user sudah exist di database
6. Jika tidak exist, create user baru dengan role customer
7. Create JWT token & session
8. Redirect ke customer dashboard

### CAPTCHA Verification
1. Component mount → call `/api/guest/captcha/generate`
2. Backend generate random 4-digit code + SVG
3. Return SVG content & unique ID ke frontend
4. User input jawaban CAPTCHA
5. Submit ke `/api/guest/captcha/verify`
6. Backend validate answer vs stored code
7. Return verified status
8. Form submit hanya bisa jika CAPTCHA verified

---

## Key Features Implemented

### 1. Authentication System
- Email/password login dengan password hashing (bcryptjs)
- Google OAuth integration (auto user creation)
- JWT-based session management
- Role-based redirect setelah login
- SVG CAPTCHA untuk spam prevention

### 2. Admin Dashboard
- Dashboard dengan metrics & charts
- User management (CRUD operations)
- Product management dengan kategori filter
- Order management dengan status tracking
- Settings page untuk configuration

### 3. Staff Dashboard
- Pending orders approval system
- Order detail modal untuk review
- Approve/reject functionality
- Approved orders tracking
- Shipping status management
- Invoice download capability

### 4. Admin Sidebar
- Role-based navigation menu
- Sticky header dengan user profile
- Mobile responsive dengan toggle
- Active state indicators
- Logout functionality

### 5. Guest Features
- Landing page dengan hero section
- Login/register forms dengan validation
- SVG CAPTCHA verification
- Google OAuth buttons
- Responsive navbar & footer
- Links antara login/register

---

## Styling & Design System

### Color Palette
```
Primary: #0e2431 (Navy Blue)
Accent: #ff4f00 (Orange)
Gray: #6b7280 (Medium Gray)
White: #ffffff
Success: #10b981 (Green)
Warning: #f59e0b (Amber)
Error: #ef4444 (Red)
Info: #3b82f6 (Blue)
```

### Typography
- Heading: Font-bold, using CSS color variables
- Body: Regular weight, 14-16px
- Caption: Smaller size, gray color

### Layout
- Flexbox untuk most layouts
- Responsive grid untuk multi-column
- Mobile-first design approach
- Max-width containers (max-w-7xl)
- Consistent spacing (gap, padding utilities)

### Components
- Rounded borders (rounded-lg)
- Shadow for depth (shadow-sm, shadow-md)
- Border styling (border, border-gray-200)
- Transitions untuk interactivity
- Disabled states untuk buttons

---

## Best Practices Applied

1. **Security**
   - Password hashing dengan bcryptjs
   - JWT tokens untuk session management
   - CAPTCHA untuk bot prevention
   - Environment variables untuk sensitive data
   - HTTP-only cookies

2. **Performance**
   - Image optimization dengan Next.js
   - Code splitting via dynamic imports
   - Efficient re-renders dengan React hooks
   - Tailwind CSS untuk minimal CSS

3. **Code Organization**
   - Component separation by feature
   - Constants centralization
   - Custom hooks untuk shared logic
   - API route organization

4. **User Experience**
   - Loading states untuk async operations
   - Error messages untuk user feedback
   - Form validation & error handling
   - Responsive design untuk semua devices
   - Consistent styling & branding

---

## Development Guidelines

### Adding New Page
1. Create folder di `/src/app/[route]/`
2. Create `page.tsx` atau `layout.tsx`
3. Import necessary components & utilities
4. Use `RoleLayout` untuk protected pages
5. Add navigation link ke menu

### Adding New Component
1. Create file di `/src/components/[feature]/`
2. Export as named export
3. Use TypeScript interfaces untuk props
4. Import dari constants untuk colors
5. Responsive design considerations

### Adding New API Route
1. Create folder di `/src/app/api/[route]/`
2. Create `route.ts` dengan handler functions
3. Implement proper error handling
4. Validate request body
5. Return appropriate status codes

### Database Changes
1. Update schema di `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name`
3. Update Prisma client imports
4. Test database operations

---

## Deployment Checklist

- [ ] Set environment variables di Vercel
- [ ] Test Google OAuth credentials
- [ ] Verify NEXTAUTH_SECRET is set
- [ ] Database migrations completed
- [ ] SSL certificate configured
- [ ] Email service configured (if applicable)
- [ ] Backup existing data
- [ ] Test login/register on production
- [ ] Monitor error logs

---

## Support & Troubleshooting

### Common Issues

1. **CAPTCHA not showing**
   - Check `/api/guest/captcha/generate` endpoint
   - Verify SVG generation logic
   - Check browser console for errors

2. **Google OAuth not working**
   - Verify GOOGLE_CLIENT_ID & SECRET
   - Check authorized redirect URIs in Google Console
   - Ensure NEXTAUTH_URL matches deployment URL

3. **Password login failing**
   - Check database connection
   - Verify bcryptjs is installed
   - Check password hashing implementation
   - Verify user exists in database

4. **Sidebar menu not showing**
   - Check AdminSidebar role prop
   - Verify menu items array
   - Check mobile toggle functionality

---

## File Naming Convention

- **Pages**: `page.tsx` (lowercase)
- **Layouts**: `layout.tsx` (lowercase)
- **Components**: PascalCase (e.g., `LoginForm.tsx`)
- **Utilities**: camelCase (e.g., `useAuth.ts`)
- **Constants**: camelCase or UPPER_CASE (e.g., `constants.ts`)
- **Styles**: Inline dengan Tailwind atau `.css` files

---

**Last Updated**: February 2026
**Version**: 1.0
**Maintained By**: V0 AI Assistant
