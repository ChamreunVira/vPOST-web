# AGENTS.md

## Project Overview

This project is a modern **Point of Sale (POS) System** frontend for a small-to-medium retail business.

The frontend is designed as a production-quality application that can initially use **JSON Server** as a mock backend and later connect to a real backend API with minimal changes.

The application must prioritize:

- Clean UI
- Excellent UX
- Strong architecture
- Reusable components
- Type safety
- Maintainability
- Clear separation of concerns
- Easy API replacement
- Realistic business workflows

---

# 1. Tech Stack

Use the following technologies:

- Next.js
- React
- TypeScript
- App Router
- Tailwind CSS
- shadcn/ui
- Lucide React
- React Hook Form
- Zod
- TanStack Table
- TanStack Query when appropriate
- JSON Server for mock API

Use stable versions already configured in the project.

Do not add dependencies unless they provide clear value.

Before installing a new dependency, check whether the existing stack already provides the required functionality.

---

# 2. Product Scope

The current MVP includes:

- Authentication
- Role-based access
- Dashboard
- POS
- Sales
- Products
- Categories
- Inventory
- Purchases
- Suppliers
- Customers
- Reports
- Users
- Settings

Core business flow:

```text
Supplier
   ↓
Purchase
   ↓
Inventory increases
   ↓
Product
   ↓
POS
   ↓
Sale
   ↓
Payment
   ↓
Receipt
   ↓
Inventory decreases
   ↓
Reports
```

Do not introduce advanced features unless explicitly requested.

Future features may include:

- Multi-branch
- Multi-warehouse
- Loyalty program
- Advanced promotions
- Accounting integration
- Payroll
- Employee attendance
- Ecommerce
- Delivery
- Advanced analytics

---

# 3. First Rule: Inspect Before Changing

Before modifying the project:

1. Inspect the repository structure.
2. Read `package.json`.
3. Read configuration files.
4. Inspect existing components.
5. Inspect existing routes.
6. Inspect existing services.
7. Inspect existing types.
8. Inspect existing styles.
9. Identify reusable code.
10. Understand the current architecture.

Do NOT immediately rewrite the project.

Preserve good existing code.

Only refactor existing code when there is a clear reason.

---

# 4. Documentation

Important documentation:

```text
README.md
docs/
└── erd.md
AGENTS.md
```

`docs/erd.md` must contain the current database/entity relationship diagram using Mermaid ERD syntax.

Whenever domain relationships change, update:

```text
docs/erd.md
```

The ERD must remain consistent with the actual application models.

---

# 5. Project Architecture

Prefer this structure:

```text
src/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   │
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── pos/
│   │   ├── sales/
│   │   ├── products/
│   │   ├── categories/
│   │   ├── inventory/
│   │   ├── purchases/
│   │   ├── suppliers/
│   │   ├── customers/
│   │   ├── reports/
│   │   ├── users/
│   │   └── settings/
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── navigation/
│   ├── tables/
│   ├── forms/
│   ├── charts/
│   ├── feedback/
│   └── shared/
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── pos/
│   ├── sales/
│   ├── products/
│   ├── categories/
│   ├── inventory/
│   ├── purchases/
│   ├── suppliers/
│   ├── customers/
│   ├── reports/
│   └── users/
│
├── services/
│   ├── api/
│   ├── products/
│   ├── sales/
│   ├── inventory/
│   ├── purchases/
│   └── customers/
│
├── hooks/
├── lib/
├── types/
├── schemas/
├── config/
└── constants/
```

Use judgment.

Do not create files or folders simply to follow the structure if they provide no value.

---

# 6. Separation of Concerns

Follow this flow:

```text
Page
 ↓
Feature Component
 ↓
Hook
 ↓
Service
 ↓
API Client
 ↓
Backend
```

For example:

```text
ProductsPage
    ↓
ProductTable
    ↓
useProducts()
    ↓
product.service.ts
    ↓
apiClient
    ↓
JSON Server / Real Backend
```

Components should NOT contain API implementation details.

Avoid:

```tsx
fetch("http://localhost:3001/products");
```

directly inside UI components.

Prefer:

```text
Component
    ↓
Hook
    ↓
Service
    ↓
API Client
```

---

# 7. API Architecture

The application initially uses JSON Server.

Mock API:

```text
http://localhost:3001
```

Use:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Never hardcode API URLs throughout the application.

Recommended:

```text
src/services/api/client.ts

src/services/products/product.service.ts
src/services/sales/sale.service.ts
src/services/inventory/inventory.service.ts
src/services/purchases/purchase.service.ts
src/services/customers/customer.service.ts
```

The application must be designed so that JSON Server can later be replaced by a real backend.

Ideally:

```text
Frontend
   ↓
API Client
   ↓
Service
   ↓
JSON Server
```

can become:

```text
Frontend
   ↓
API Client
   ↓
Service
   ↓
Real Backend
```

without rewriting UI components.

---

# 8. Mock Data

Mock data belongs in:

```text
db/
└── db.json
```

Do not put large mock arrays directly inside React components.

Do not use unrealistic placeholder data such as:

```text
Product 1
Product 2
Test User
Lorem ipsum
ABC
```

Use realistic retail data.

Examples:

```text
Coca-Cola 330ml
Pepsi 330ml
Sting Energy Drink
Angkor Water 500ml
Hanuman Energy Drink
Lays Potato Chips
Oishi Green Tea
Indomie Noodles
```

Use realistic prices, quantities, customers, suppliers, sales, and inventory transactions.

---

# 9. TypeScript Rules

Use strict TypeScript.

Do NOT use:

```typescript
any;
```

unless there is an extremely specific and documented reason.

Prefer explicit types.

Domain types should represent actual business entities:

```text
User
Product
Category
Supplier
Customer
Purchase
PurchaseItem
Sale
SaleItem
Payment
InventoryTransaction
```

Avoid duplicating the same type definition across multiple files.

---

# 10. Validation

Use Zod for form validation.

Schemas should exist for important domain forms:

```text
productSchema
categorySchema
supplierSchema
customerSchema
purchaseSchema
saleSchema
userSchema
```

Use React Hook Form for complex forms.

Validation must cover:

- Required fields
- Invalid values
- Negative prices
- Invalid quantities
- Invalid email
- Invalid phone
- Duplicate SKU where applicable
- Stock constraints
- Business rules

Display clear validation messages.

---

# 11. UI Design System

The UI must be:

- Clean
- Creative
- Professional
- Modern
- Premium
- Practical
- Information-dense
- Easy to understand

Avoid generic dashboard-template aesthetics.

Use shadcn/ui as the foundation.

Customize components where appropriate.

Do not unnecessarily replace shadcn/ui with custom implementations.

---

# 12. Border Radius Rules

This is a strict design requirement.

Do NOT use excessive rounded corners.

Preferred:

```text
rounded-sm
rounded-md
```

Avoid:

```text
rounded-lg
rounded-xl
rounded-2xl
```

Use:

```text
rounded-full
```

only where semantically appropriate, such as:

- Avatar
- Small status indicator
- Certain badges
- Circular icon controls

Main cards, tables, dialogs, inputs, and containers should generally use:

```text
rounded-md
```

or smaller.

---

# 13. Shadow Rules

Keep shadows subtle.

Preferred:

```text
shadow-sm
```

or no shadow.

Avoid:

```text
shadow-md
shadow-lg
shadow-xl
shadow-2xl
```

Use:

- Borders
- Spacing
- Background contrast
- Typography

to establish hierarchy.

---

# 14. Typography

Prefer:

```text
Inter
```

Use a clear typography hierarchy.

Do not use oversized headings unnecessarily.

Use appropriate font weights:

```text
font-medium
font-semibold
font-bold
```

Avoid excessive bold text.

---

# 15. Color System

Use semantic design tokens.

Prefer:

```text
bg-background
bg-card
text-foreground
text-muted-foreground
border-border
text-destructive
```

Do not scatter arbitrary color values throughout components.

Status colors should be consistent:

```text
Success → green
Warning → amber
Error → red
Info → blue
```

Status should not rely only on color. Use text or icons as well.

---

# 16. Reusable Components

Create reusable components when the same UI pattern appears multiple times.

Examples:

```text
PageHeader
PageContainer
SearchInput
FilterBar
DataTable
DataTablePagination
StatusBadge
StatsCard
ChartCard
EmptyState
LoadingState
ErrorState
ConfirmDialog
DeleteDialog
FormField
SearchableSelect
PriceDisplay
DateDisplay
ImagePreview
```

Avoid premature abstraction.

A component should be reusable because there is a meaningful shared behavior or UI pattern.

---

# 17. Data Tables

Every major data table should support the actions relevant to its domain.

At minimum, consider:

- Search
- Sorting
- Filtering
- Pagination
- Row actions
- Loading
- Empty state
- Error state

Pagination should provide:

```text
Rows per page:
10 / 20 / 50 / 100

Showing 1–20 of 245

Previous
1
2
3
Next
```

Use TanStack Table where appropriate.

Do not manually recreate complex table behavior unnecessarily.

---

# 18. Search

Search should be available on major list pages.

Examples:

```text
Search products...
Search customers...
Search suppliers...
Search sales...
```

Search should have:

- Clear button where useful
- Loading state when appropriate
- Empty state
- Debouncing where appropriate

Do not over-engineer search.

---

# 19. Filtering

Use relevant filters.

Products:

```text
Category
Status
Stock Status
```

Sales:

```text
Date Range
Cashier
Payment Method
Status
```

Purchases:

```text
Supplier
Date Range
Status
```

Inventory:

```text
Category
Stock Status
```

Avoid adding meaningless filters.

---

# 20. Sorting

Allow sorting by meaningful fields.

Examples:

```text
Name
Price
Stock
Created At
Updated At
Total
Date
```

Use clear ascending/descending indicators.

---

# 21. Loading States

Every API-driven screen must have a loading state.

Prefer skeletons for content-heavy screens.

Examples:

- Table skeleton
- Card skeleton
- Dashboard skeleton
- Product grid skeleton

Do not show an empty screen while data is loading.

---

# 22. Error States

Every API-driven screen must handle errors.

Example:

```text
Something went wrong.

We couldn't load the products.

[Try Again]
```

Do not silently fail.

Do not expose raw API errors directly to users.

---

# 23. Empty States

Every list must have an appropriate empty state.

Example:

```text
No products found.

Try changing your filters or add your first product.

[Add Product]
```

Empty states should provide useful next actions.

---

# 24. Destructive Actions

Require confirmation for:

- Deleting
- Deactivating
- Cancelling
- Removing important records

Use shadcn/ui confirmation dialogs.

Do not permanently delete historical business records when the business domain requires historical integrity.

For example, products with sales history should generally become:

```text
status = INACTIVE
```

rather than being physically deleted.

---

# 25. Toast Notifications

Use toast notifications for meaningful actions.

Success:

```text
Product created successfully.
```

Error:

```text
Failed to create product.
```

Update:

```text
Product updated successfully.
```

Avoid excessive toast notifications.

---

# 26. Images

Use real public image URLs for product images.

Do not use fake local placeholders unless explicitly requested.

Store image URLs as data:

```json
{
  "imageUrl": "https://..."
}
```

Configure Next.js image domains correctly.

Keep image handling easy to replace later.

---

# 27. POS UX

The POS screen is the highest-priority screen.

Optimize it for speed.

It should support:

- Product search
- Barcode input
- Category filtering
- Add to cart
- Increase quantity
- Decrease quantity
- Remove item
- Clear cart
- Customer selection
- Discount
- Tax
- Payment
- Receipt

The cashier should be able to complete a normal sale with minimal clicks.

---

# 28. Business Rules

Important business rules:

### Product

```text
costPrice >= 0
sellingPrice >= 0
stock >= 0
minimumStock >= 0
```

### Sale

Do not allow:

```text
soldQuantity > availableStock
```

### Purchase

Receiving a purchase:

```text
stock += purchasedQuantity
```

### Sale

Completing a sale:

```text
stock -= soldQuantity
```

### Return

Returning a product:

```text
stock += returnedQuantity
```

### Low Stock

```text
currentStock <= minimumStock
```

### Out of Stock

```text
currentStock === 0
```

---

# 29. Transaction Integrity

The following operations represent one business operation:

```text
Sale
 ↓
Sale Items
 ↓
Payment
 ↓
Inventory Update
 ↓
Inventory Transaction
```

The UI should represent this flow clearly.

Do not create confusing screens that imply payment succeeded when the sale did not complete.

For the frontend mock implementation, simulate the correct flow.

---

# 30. Role-Based UI

Roles:

```text
OWNER
MANAGER
CASHIER
```

OWNER:

```text
Everything
```

MANAGER:

```text
Dashboard
Products
Categories
Inventory
Purchases
Suppliers
POS
Sales
Customers
Reports
```

CASHIER:

```text
POS
Sales History
Customers
Profile
```

Do not rely only on hiding UI for real authorization.

Frontend role checks are for UX.

Actual authorization must eventually be enforced by the backend.

---

# 31. Next.js Rules

Use the App Router.

Prefer Server Components by default.

Use Client Components only when required.

Use `"use client"` for components that require:

- State
- Effects
- Browser APIs
- Interactive event handlers
- Client-side libraries

Do not make the entire application a Client Component.

---

# 32. Routing

Use route-based architecture.

Prefer:

```text
/dashboard
/pos
/products
/products/new
/products/[id]/edit
/sales
/sales/[id]
/inventory
/purchases
/purchases/new
/suppliers
/customers
/customers/[id]
/reports
/users
/settings
```

Do not build the entire application as one giant page with conditional rendering.

---

# 33. Forms

Forms should:

- Have clear labels
- Show validation
- Preserve user input when possible
- Disable submit during submission
- Show loading state
- Show success/error feedback
- Prevent duplicate submission

Use reusable form patterns.

---

# 34. Accessibility

Follow accessibility best practices.

Ensure:

- Labels exist for inputs
- Buttons have meaningful labels
- Icon-only buttons have tooltips/accessible labels
- Dialogs are accessible
- Keyboard navigation works
- Focus states are visible
- Tables are readable
- Color is not the only status indicator

---

# 35. Responsive Design

Support:

- Desktop
- Laptop
- Tablet

The POS interface should prioritize desktop and tablet.

The dashboard and management pages should remain usable at smaller widths.

Do not simply shrink everything.

Change layout when appropriate.

---

# 36. Performance

Follow good Next.js practices.

- Avoid unnecessary Client Components
- Avoid unnecessary API calls
- Use pagination
- Avoid loading huge datasets
- Use optimized images
- Avoid unnecessary re-renders
- Keep state local where possible
- Use TanStack Query when it meaningfully improves server-state management

Do not optimize prematurely.

Prefer clear code first.

---

# 37. State Management

Do not introduce global state management unless there is a real requirement.

Use:

- Local React state for local UI state
- URL search params for shareable filters/pagination where appropriate
- TanStack Query for server state where appropriate
- Context only for genuinely global concerns

Do not create a global store for every piece of state.

---

# 38. URL State

For list pages, prefer URL state for important query parameters when appropriate.

Example:

```text
/products?page=2&search=coca&category=drinks&status=active
```

This makes filters and pagination:

- Shareable
- Refresh-safe
- Browser-history friendly

Do not force every local UI state into the URL.

---

# 39. API Response Handling

Do not make UI components understand raw backend response structures unnecessarily.

Normalize data in services when needed.

Example:

```text
API Response
     ↓
Service
     ↓
Domain Model
     ↓
UI
```

Keep backend-specific details isolated.

---

# 40. File Naming

Use consistent naming.

React components:

```text
PascalCase.tsx
```

Examples:

```text
ProductTable.tsx
PageHeader.tsx
StatusBadge.tsx
```

Hooks:

```text
useProducts.ts
useSales.ts
```

Services:

```text
product.service.ts
sale.service.ts
```

Schemas:

```text
product.schema.ts
sale.schema.ts
```

Types:

```text
product.ts
sale.ts
```

Do not randomly mix naming conventions.

---

# 41. Component Naming

Use names based on responsibility.

Good:

```text
ProductTable
ProductFilters
ProductForm
ProductDetails
```

Avoid vague names:

```text
Thing
Box
Data
Stuff
Component1
```

Do not rename existing variables without a reason.

Avoid unnecessary naming drift.

---

# 42. Code Style

Prefer:

- Small functions
- Clear names
- Early returns
- Explicit types
- Reusable utilities
- Simple control flow

Avoid:

- Deep nesting
- Huge components
- Clever one-liners
- Unnecessary abstractions
- Duplicate business logic
- Magic numbers
- Magic strings

Extract constants when values are reused.

---

# 43. No Hardcoded Business Logic in UI

Avoid:

```tsx
if (price > 100) ...
```

when the rule belongs to the domain.

Prefer a domain utility or service.

UI should focus on presentation and interaction.

---

# 44. Dashboard Architecture

Dashboard widgets should be independently reusable.

Examples:

```text
StatsCard
SalesOverviewChart
RevenueChart
TopProducts
LowStockProducts
RecentTransactions
```

Do not create one giant Dashboard component.

---

# 45. Reports Architecture

Reports should be composed of reusable:

```text
ReportHeader
DateRangeFilter
ReportStats
ReportChart
ReportTable
ExportButton
```

Do not duplicate date filtering logic across every report.

---

# 46. Mock API Scripts

Ensure `package.json` contains an appropriate script for JSON Server.

Example:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "mock-api": "json-server --watch db/db.json --port 3001"
  }
}
```

Adapt the script if the installed JSON Server version uses a different command.

---

# 47. Environment Variables

Use:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Never commit secrets.

If `.env.example` is appropriate, create:

```text
.env.example
```

with safe example values.

---

# 48. README

Keep `README.md` updated.

It should contain:

- Project overview
- Features
- Tech stack
- Architecture
- Folder structure
- Setup
- Environment variables
- Running frontend
- Running mock API
- Mock API structure
- API replacement strategy
- Development commands
- ERD location

---

# 49. ERD

The authoritative frontend domain ERD is:

```text
docs/erd.md
```

It must include relationships for:

```text
users
roles
products
categories
suppliers
purchases
purchase_items
customers
sales
sale_items
payments
inventory_transactions
```

Use Mermaid.

Update the ERD whenever the domain model changes.

---

# 50. Testing and Verification

Before considering work complete:

Run:

```bash
npm run build
```

Run lint/type checking if configured.

Check:

- TypeScript errors
- ESLint errors
- Broken imports
- Missing dependencies
- Missing keys
- React hook problems
- Invalid routes
- Broken links
- API errors
- Empty states
- Loading states
- Error states
- Responsive layout
- Form validation

Fix errors instead of ignoring them.

---

# 51. Development Workflow

For larger tasks, follow this workflow:

### Step 1 — Inspect

Read relevant files.

### Step 2 — Plan

Provide a short plan.

Example:

```text
1. Add product types
2. Add product service
3. Add product query hook
4. Build product table
5. Add filters
6. Add pagination
7. Add create/edit form
8. Test build
```

### Step 3 — Implement

Make focused changes.

### Step 4 — Verify

Run:

```bash
npm run build
```

and relevant lint/type checks.

### Step 5 — Fix

Fix all errors introduced by the implementation.

### Step 6 — Summarize

Explain:

- What changed
- Files created
- Files modified
- Important architectural decisions
- Verification results

---

# 52. Do Not Do These Things

Never:

- Use `any` unnecessarily
- Put API calls directly into every component
- Hardcode API URLs
- Put huge mock datasets inside components
- Create giant page components
- Create giant hooks
- Create unnecessary global state
- Add unnecessary dependencies
- Use excessive rounded corners
- Use large shadows
- Build generic-looking UI
- Ignore loading states
- Ignore error states
- Ignore empty states
- Ignore pagination
- Ignore filtering
- Ignore sorting
- Delete historical business data carelessly
- Rewrite the entire project unnecessarily
- Add features outside the requested scope
- Claim something works without verifying it

---

# 53. Priority Order

When making trade-offs, prioritize:

```text
1. Correct business behavior
2. Clean architecture
3. Type safety
4. User experience
5. Accessibility
6. Maintainability
7. Performance
8. Visual polish
```

Do not sacrifice business correctness for visual effects.

---

# 54. Definition of Done

A feature is complete only when:

- UI is implemented
- Responsive behavior is considered
- Loading state exists
- Error state exists
- Empty state exists
- Validation exists where necessary
- API access is separated from UI
- Types are defined
- Search/filter/sort/pagination are included where relevant
- Actions have appropriate confirmation
- Success/error feedback exists
- No unnecessary `any`
- No obvious TypeScript errors
- No obvious lint errors
- Build succeeds
- Documentation is updated when architecture/domain changes

---

# 55. Communication Rules for AI Agents

When working on this project:

1. Do not make large architectural changes silently.
2. For complex tasks, provide a short plan first.
3. Explain important trade-offs briefly.
4. Before creating major files, identify the recommended path and filename.
5. Reuse existing code when appropriate.
6. Do not modify unrelated files.
7. Do not introduce unrelated refactors.
8. Keep changes focused on the requested task.
9. After implementation, report verification results.
10. If something cannot be verified, state that clearly.

The goal is to produce code that another developer can easily understand and continue developing.

---

# 56. Final Principle

Build this project as if it will eventually become a real commercial POS application.

The frontend should be:

```text
Clean
+
Reusable
+
Type-safe
+
Well-structured
+
API-independent
+
Accessible
+
Responsive
+
Business-focused
```

Do not optimize for "more code".

Optimize for **clear architecture and a great product**.
