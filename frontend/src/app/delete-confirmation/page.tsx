import type { Metadata } from 'next';

import DeleteConfirmationModal from '../../components/modals/DeleteConfirmationModal';

export const metadata: Metadata = {
  title: 'Delete Category Confirmation | ChemLab 3D',
  description: 'Modal xác nhận xóa danh mục dùng chung.',
};

export default function DeleteConfirmationPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-surface text-on-surface antialiased">
      <div className="pointer-events-none fixed inset-0 z-0 grid grid-cols-1 gap-gutter p-margin-desktop opacity-40 md:grid-cols-3">
        <div className="h-64 rounded-lg border-2 border-outline-variant bg-surface-container-high p-6" />
        <div className="h-64 rounded-lg border-2 border-secondary/30 bg-secondary-container/20 p-6" />
        <div className="h-64 rounded-lg border-2 border-outline-variant bg-surface-container-high p-6" />
      </div>
      <DeleteConfirmationModal />
    </div>
  );
}
