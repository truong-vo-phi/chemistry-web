import Link from 'next/link';

import { appRoutes } from '../../config/site-routes';

export default function SiteFooter() {
  return (
    <footer className="relative z-10 mt-auto w-full rounded-t-xl border-t-2 border-surface-variant bg-surface-container">
      <div className="mx-auto grid w-full max-w-container-max grid-cols-1 gap-8 px-margin-mobile py-gutter md:grid-cols-4 md:px-margin-desktop">
        <div className="flex flex-col gap-2">
          <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary">ChemLab 3D</span>
          <p className="font-body-md text-body-md text-on-surface-variant">He thong phong thi nghiem ao 2D cho hoc tap hoa hoc tuong tac.</p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-label-sm text-label-sm text-on-surface">Link nhanh</h3>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary" href={appRoutes.home}>Trang chu</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary" href={appRoutes.theoryCourseLibrary}>Khoa hoc</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary" href={appRoutes.scienceNewsBlog}>Tin tuc</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary" href={appRoutes.register}>Dang ky</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-label-sm text-label-sm text-on-surface">Lien he</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Email: support@chemlab3d.edu.vn</p>
          <p className="font-body-md text-body-md text-on-surface-variant">Hotline: 1900 86 68</p>
          <p className="font-body-md text-body-md text-on-surface-variant">Dia chi: TP. Ho Chi Minh</p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-label-sm text-label-sm text-on-surface">He thong</h3>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary" href={appRoutes.launch3dLab}>An toan phong lab</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary" href={appRoutes.settingsCustomization}>Chinh sach bao mat</Link>
          <p className="mt-2 font-body-md text-body-md text-secondary">© 2026 ChemLab 3D</p>
        </div>
      </div>
    </footer>
  );
}
