'use client';

import { StaffDashboardLayout } from '@/components/admin/staff/StaffDashboardLayout';
import { StaffCustomersTable } from '@/components/admin/staff/StaffCustomersTable';

export default function StaffCustomersPage() {
  return (
    <StaffDashboardLayout activeTab="customers">
      <StaffCustomersTable />
    </StaffDashboardLayout>
  );
}
