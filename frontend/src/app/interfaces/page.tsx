import type { Metadata } from 'next';
import Link from 'next/link';

import AppShell from '../../components/layout/app-shell';
import InterfaceGrid from '../../components/layout/interface-grid';
import { interfaceGroups } from '../../config/navigation';
import { appRoutes } from '../../config/site-routes';

export const metadata: Metadata = {
  title: 'Điều hướng giao diện | ChemLab 3D',
  description: 'Trang điều hướng nhanh đến tất cả giao diện chức năng của ChemLab 3D.',
};

export default function InterfacesPage() {
  return (
    <AppShell
      title="Bảng Điều Hướng Giao Diện"
      subtitle="Trang này giúp truy cập nhanh toàn bộ giao diện chức năng đã triển khai. Tất cả link điều hướng tạm trước đây (`#`) đã được nối về các route thực tế hoặc fallback về trang này."
      headerActions={
        <>
          <Link
            href={appRoutes.home}
            className="rounded-full border-2 border-on-primary-fixed-variant bg-primary px-5 py-2 font-label-sm text-on-primary shadow-[0_4px_0_0_rgba(0,67,149,0.3)]"
          >
            Về trang chủ
          </Link>
          <Link
            href={appRoutes.createCategory}
            className="rounded-full border-2 border-outline-variant bg-surface px-5 py-2 font-label-sm text-on-surface"
          >
            Mở tạo danh mục mới
          </Link>
        </>
      }
    >
      <p className="mb-4 text-sm text-on-surface-variant">ChemLab 3D</p>
      <InterfaceGrid groups={interfaceGroups} />
    </AppShell>
  );
}
