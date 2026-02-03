'use client';

import React from 'react';
import Link from 'next/link';
import { Badge, Button } from '@heroui/react';
import { Bell } from 'lucide-react';
import { COLORS } from '@/lib/constants';

interface NotificationBellProps {
  unreadCount?: number;
}

export function NotificationBell({ unreadCount = 0 }: NotificationBellProps) {
  return (
    <Link href="/notifications">
      <Button
        isIconOnly
        variant="light"
        className="relative"
      >
        <Badge
          color="danger"
          content={unreadCount > 0 ? unreadCount : 0}
          isInvisible={unreadCount === 0}
          shape="circle"
        >
          <Bell className="w-5 h-5" style={{ color: COLORS.accent }} />
        </Badge>
      </Button>
    </Link>
  );
}
