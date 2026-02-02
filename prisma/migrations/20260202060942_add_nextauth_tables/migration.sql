-- CreateTable
CREATE TABLE "activity_logs" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "action" VARCHAR(100) NOT NULL,
    "entity_type" VARCHAR(100),
    "entity_id" INTEGER,
    "old_value" JSONB,
    "new_value" JSONB,
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_settings" (
    "id" SERIAL NOT NULL,
    "setting_key" VARCHAR(100) NOT NULL,
    "setting_value" TEXT,
    "setting_type" VARCHAR(50),
    "description" TEXT,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_items" (
    "id" SERIAL NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price_at_add" DECIMAL(12,2) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "image_url" VARCHAR(255),
    "parent_category_id" INTEGER,
    "is_active" BOOLEAN DEFAULT true,
    "display_order" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_templates" (
    "id" SERIAL NOT NULL,
    "template_name" VARCHAR(100) NOT NULL,
    "subject" VARCHAR(255),
    "body_html" TEXT,
    "variables" TEXT[],
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(100),
    "question" VARCHAR(500) NOT NULL,
    "answer" TEXT NOT NULL,
    "view_count" INTEGER DEFAULT 0,
    "helpful_count" INTEGER DEFAULT 0,
    "unhelpful_count" INTEGER DEFAULT 0,
    "is_active" BOOLEAN DEFAULT true,
    "display_order" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq_feedback" (
    "id" SERIAL NOT NULL,
    "faq_id" INTEGER NOT NULL,
    "user_id" INTEGER,
    "session_id" VARCHAR(255),
    "is_helpful" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "faq_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_logs" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity_change" INTEGER NOT NULL,
    "reason" VARCHAR(100),
    "reference_id" INTEGER,
    "notes" TEXT,
    "changed_by" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inventory_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" VARCHAR(50),
    "title" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "data" JSONB,
    "is_read" BOOLEAN DEFAULT false,
    "read_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(12,2) NOT NULL,
    "discount_amount" DECIMAL(12,2) DEFAULT 0,
    "total_price" DECIMAL(12,2) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "order_number" VARCHAR(50) NOT NULL,
    "user_id" INTEGER,
    "guest_email" VARCHAR(255),
    "subtotal" DECIMAL(12,2) NOT NULL,
    "shipping_cost" DECIMAL(12,2) DEFAULT 0,
    "tax_amount" DECIMAL(12,2) DEFAULT 0,
    "discount_amount" DECIMAL(12,2) DEFAULT 0,
    "total_amount" DECIMAL(12,2) NOT NULL,
    "order_status" VARCHAR(50) DEFAULT 'pending',
    "payment_status" VARCHAR(50) DEFAULT 'unpaid',
    "shipping_address_id" INTEGER,
    "shipping_method" VARCHAR(100),
    "tracking_number" VARCHAR(100),
    "payment_method" VARCHAR(50),
    "payment_gateway_id" VARCHAR(100),
    "payment_gateway_token" VARCHAR(255),
    "customer_notes" TEXT,
    "estimated_delivery_date" DATE,
    "actual_delivery_date" DATE,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "payment_method" VARCHAR(50) NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "payment_status" VARCHAR(50) DEFAULT 'pending',
    "gateway_transaction_id" VARCHAR(255),
    "gateway_reference" VARCHAR(255),
    "error_message" TEXT,
    "paid_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_images" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,
    "alt_text" VARCHAR(255),
    "is_primary" BOOLEAN DEFAULT false,
    "display_order" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_requests" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "product_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "requested_quantity" INTEGER,
    "status" VARCHAR(50) DEFAULT 'pending',
    "notes" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_reviews" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" VARCHAR(255),
    "review_text" TEXT,
    "is_verified_purchase" BOOLEAN DEFAULT false,
    "helpful_count" INTEGER DEFAULT 0,
    "unhelpful_count" INTEGER DEFAULT 0,
    "is_approved" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "detailed_description" TEXT,
    "price" DECIMAL(12,2) NOT NULL,
    "cost_price" DECIMAL(12,2),
    "discount_price" DECIMAL(12,2),
    "discount_percentage" INTEGER DEFAULT 0,
    "stock_quantity" INTEGER DEFAULT 0,
    "sku" VARCHAR(100),
    "weight" DECIMAL(8,2),
    "dimensions" VARCHAR(100),
    "is_featured" BOOLEAN DEFAULT false,
    "is_active" BOOLEAN DEFAULT true,
    "rating" DECIMAL(3,2) DEFAULT 0,
    "review_count" INTEGER DEFAULT 0,
    "view_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotions" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "discount_type" VARCHAR(20),
    "discount_value" DECIMAL(12,2) NOT NULL,
    "max_discount_amount" DECIMAL(12,2),
    "min_purchase_amount" DECIMAL(12,2),
    "usage_limit" INTEGER,
    "usage_count" INTEGER DEFAULT 0,
    "usage_per_customer" INTEGER DEFAULT 1,
    "valid_from" TIMESTAMP(6) NOT NULL,
    "valid_until" TIMESTAMP(6) NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotations" (
    "id" SERIAL NOT NULL,
    "quotation_number" VARCHAR(50) NOT NULL,
    "user_id" INTEGER,
    "client_name" VARCHAR(255),
    "client_email" VARCHAR(255),
    "client_phone" VARCHAR(20),
    "items" JSONB NOT NULL,
    "total_amount" DECIMAL(12,2) NOT NULL,
    "status" VARCHAR(50) DEFAULT 'pending',
    "valid_until" TIMESTAMP(6),
    "notes" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quotations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "permissions" JSONB DEFAULT '{}',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shopping_carts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "session_id" VARCHAR(255),
    "total_price" DECIMAL(12,2) DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shopping_carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "support_ticket_messages" (
    "id" SERIAL NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "message_text" TEXT NOT NULL,
    "attachment_url" VARCHAR(255),
    "internal_note" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "support_ticket_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "support_tickets" (
    "id" SERIAL NOT NULL,
    "ticket_number" VARCHAR(50) NOT NULL,
    "user_id" INTEGER,
    "order_id" INTEGER,
    "subject" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "priority" VARCHAR(50) DEFAULT 'normal',
    "category" VARCHAR(100),
    "status" VARCHAR(50) DEFAULT 'open',
    "assigned_to" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMP(6),
    "closed_at" TIMESTAMP(6),

    CONSTRAINT "support_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "client_name" VARCHAR(255) NOT NULL,
    "client_email" VARCHAR(255),
    "client_company" VARCHAR(255),
    "testimonial_text" TEXT NOT NULL,
    "image_url" VARCHAR(255),
    "rating" INTEGER,
    "is_approved" BOOLEAN DEFAULT false,
    "is_featured" BOOLEAN DEFAULT false,
    "display_order" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_addresses" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "street_address" VARCHAR(255) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "province" VARCHAR(100) NOT NULL,
    "postal_code" VARCHAR(10) NOT NULL,
    "country" VARCHAR(100) DEFAULT 'Indonesia',
    "is_default" BOOLEAN DEFAULT false,
    "address_type" VARCHAR(50),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(20),
    "avatar_url" VARCHAR(255),
    "role_id" INTEGER NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "email_verified" BOOLEAN DEFAULT false,
    "email_verified_at" TIMESTAMP(6),
    "last_login" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE INDEX "idx_activity_logs_action" ON "activity_logs"("action");

-- CreateIndex
CREATE INDEX "idx_activity_logs_created_at" ON "activity_logs"("created_at");

-- CreateIndex
CREATE INDEX "idx_activity_logs_entity_type_id" ON "activity_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "idx_activity_logs_user_id" ON "activity_logs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "application_settings_setting_key_key" ON "application_settings"("setting_key");

-- CreateIndex
CREATE INDEX "idx_cart_items_cart_id" ON "cart_items"("cart_id");

-- CreateIndex
CREATE INDEX "idx_cart_items_product_id" ON "cart_items"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_cart_id_product_id_key" ON "cart_items"("cart_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "idx_categories_parent_id" ON "categories"("parent_category_id");

-- CreateIndex
CREATE INDEX "idx_categories_slug" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "email_templates_template_name_key" ON "email_templates"("template_name");

-- CreateIndex
CREATE INDEX "idx_faq_category" ON "faq"("category");

-- CreateIndex
CREATE INDEX "idx_faq_is_active" ON "faq"("is_active");

-- CreateIndex
CREATE INDEX "idx_faq_feedback_faq_id" ON "faq_feedback"("faq_id");

-- CreateIndex
CREATE INDEX "idx_inventory_logs_created_at" ON "inventory_logs"("created_at");

-- CreateIndex
CREATE INDEX "idx_inventory_logs_product_id" ON "inventory_logs"("product_id");

-- CreateIndex
CREATE INDEX "idx_notifications_created_at" ON "notifications"("created_at");

-- CreateIndex
CREATE INDEX "idx_notifications_is_read" ON "notifications"("is_read");

-- CreateIndex
CREATE INDEX "idx_notifications_user_id" ON "notifications"("user_id");

-- CreateIndex
CREATE INDEX "idx_order_items_order_id" ON "order_items"("order_id");

-- CreateIndex
CREATE INDEX "idx_order_items_product_id" ON "order_items"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_number_key" ON "orders"("order_number");

-- CreateIndex
CREATE INDEX "idx_orders_created_at" ON "orders"("created_at");

-- CreateIndex
CREATE INDEX "idx_orders_order_number" ON "orders"("order_number");

-- CreateIndex
CREATE INDEX "idx_orders_order_status" ON "orders"("order_status");

-- CreateIndex
CREATE INDEX "idx_orders_payment_status" ON "orders"("payment_status");

-- CreateIndex
CREATE INDEX "idx_orders_user_id" ON "orders"("user_id");

-- CreateIndex
CREATE INDEX "idx_payments_order_id" ON "payments"("order_id");

-- CreateIndex
CREATE INDEX "idx_payments_payment_status" ON "payments"("payment_status");

-- CreateIndex
CREATE INDEX "idx_product_images_product_id" ON "product_images"("product_id");

-- CreateIndex
CREATE INDEX "idx_product_requests_status" ON "product_requests"("status");

-- CreateIndex
CREATE INDEX "idx_product_requests_user_id" ON "product_requests"("user_id");

-- CreateIndex
CREATE INDEX "idx_product_reviews_is_approved" ON "product_reviews"("is_approved");

-- CreateIndex
CREATE INDEX "idx_product_reviews_product_id" ON "product_reviews"("product_id");

-- CreateIndex
CREATE INDEX "idx_product_reviews_user_id" ON "product_reviews"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");

-- CreateIndex
CREATE INDEX "idx_products_category_id" ON "products"("category_id");

-- CreateIndex
CREATE INDEX "idx_products_is_active" ON "products"("is_active");

-- CreateIndex
CREATE INDEX "idx_products_is_featured" ON "products"("is_featured");

-- CreateIndex
CREATE INDEX "idx_products_slug" ON "products"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "promotions_code_key" ON "promotions"("code");

-- CreateIndex
CREATE INDEX "idx_promotions_code" ON "promotions"("code");

-- CreateIndex
CREATE INDEX "idx_promotions_is_active" ON "promotions"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "quotations_quotation_number_key" ON "quotations"("quotation_number");

-- CreateIndex
CREATE INDEX "idx_quotations_status" ON "quotations"("status");

-- CreateIndex
CREATE INDEX "idx_quotations_user_id" ON "quotations"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE INDEX "idx_shopping_carts_session_id" ON "shopping_carts"("session_id");

-- CreateIndex
CREATE INDEX "idx_shopping_carts_user_id" ON "shopping_carts"("user_id");

-- CreateIndex
CREATE INDEX "idx_support_ticket_messages_ticket_id" ON "support_ticket_messages"("ticket_id");

-- CreateIndex
CREATE INDEX "idx_support_ticket_messages_user_id" ON "support_ticket_messages"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "support_tickets_ticket_number_key" ON "support_tickets"("ticket_number");

-- CreateIndex
CREATE INDEX "idx_support_tickets_assigned_to" ON "support_tickets"("assigned_to");

-- CreateIndex
CREATE INDEX "idx_support_tickets_status" ON "support_tickets"("status");

-- CreateIndex
CREATE INDEX "idx_support_tickets_user_id" ON "support_tickets"("user_id");

-- CreateIndex
CREATE INDEX "idx_testimonials_is_approved" ON "testimonials"("is_approved");

-- CreateIndex
CREATE INDEX "idx_user_addresses_user_id" ON "user_addresses"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_users_email" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_users_is_active" ON "users"("is_active");

-- CreateIndex
CREATE INDEX "idx_users_role_id" ON "users"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "shopping_carts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_category_id_fkey" FOREIGN KEY ("parent_category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "faq_feedback" ADD CONSTRAINT "faq_feedback_faq_id_fkey" FOREIGN KEY ("faq_id") REFERENCES "faq"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "faq_feedback" ADD CONSTRAINT "faq_feedback_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventory_logs" ADD CONSTRAINT "inventory_logs_changed_by_fkey" FOREIGN KEY ("changed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventory_logs" ADD CONSTRAINT "inventory_logs_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shipping_address_id_fkey" FOREIGN KEY ("shipping_address_id") REFERENCES "user_addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_requests" ADD CONSTRAINT "product_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shopping_carts" ADD CONSTRAINT "shopping_carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "support_ticket_messages" ADD CONSTRAINT "support_ticket_messages_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "support_tickets"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "support_ticket_messages" ADD CONSTRAINT "support_ticket_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
