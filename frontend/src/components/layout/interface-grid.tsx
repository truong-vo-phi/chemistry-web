import Link from 'next/link';
import type { InterfaceGroup } from '../../config/navigation';

type InterfaceGridProps = {
  groups: InterfaceGroup[];
};

export default function InterfaceGrid({ groups }: InterfaceGridProps) {
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.group} className="rounded-xl border-2 border-surface-variant bg-surface-container-lowest p-6 shadow-sm">
          <h2 className="mb-4 font-headline-md text-headline-md text-primary">{group.group}</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.items.map((item) => (
              <Link
                key={item.path + item.title}
                href={item.path}
                className="rounded-lg border-2 border-outline-variant/40 bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
              >
                <h3 className="font-label-sm text-label-sm font-bold text-on-surface">{item.title}</h3>
                <p className="mt-1 text-sm text-on-surface-variant">{item.description}</p>
                <p className="mt-3 text-xs text-primary">{item.path}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
