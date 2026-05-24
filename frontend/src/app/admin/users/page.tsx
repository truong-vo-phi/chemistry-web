import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../../config/site-routes';

export const metadata: Metadata = {
  title: 'User Management - ChemLab 3D',
};

export default function UserManagementPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen pb-24 md:pb-0">
      <div className="px-margin-mobile md:px-margin-desktop w-full max-w-[1296px] mx-auto z-50 relative">
        <header className="bg-surface rounded-lg mt-4 border-2 border-surface-variant shadow-sm flex justify-between items-center w-full px-gutter py-unit max-w-container-max mx-auto">
          <div className="flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200">
            <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center border-2 border-primary-fixed-variant shadow-[2px_2px_0px_0px_rgba(0,67,149,0.3)]">
              <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>science</span>
            </div>
            <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">ChemLab 3D</span>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-start ml-8 gap-8">
            <div className="relative w-64 group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">search</span>
              <input className="w-full bg-surface-container-lowest border-2 border-surface-variant rounded-full py-2 pl-10 pr-4 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary-fixed/30 transition-all shadow-sm" placeholder="Tìm kiếm bài học..." type="text" />
            </div>
            <nav className="flex items-center gap-6">
              <Link className="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200" href={appRoutes.home}>Khám phá</Link>
              <Link className="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200" href={appRoutes.periodicTable}>Bảng Tuần Hoàn</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <Link href={appRoutes.launch3dLab} className="hidden md:flex items-center gap-2 bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded-full border-2 border-on-primary-fixed-variant shadow-[0px_4px_0px_0px_rgba(0,67,149,0.3)] hover:-translate-y-0.5 hover:shadow-[0px_6px_0px_0px_rgba(0,67,149,0.3)] active:translate-y-1 active:shadow-none transition-all">
              <span className="material-symbols-outlined">rocket_launch</span>
              Launch Lab
            </Link>
            <div className="w-10 h-10 rounded-full border-2 border-tertiary-fixed-dim overflow-hidden cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 bg-tertiary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-tertiary-container">person</span>
            </div>
          </div>
        </header>
      </div>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-gutter">
        <div className="mb-8">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">User Management</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Oversee laboratory access, manage permissions, and track active learners across ChemLab 3D.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-unit md:gap-gutter mb-gutter">
          <div className="bg-surface-container-lowest border-2 border-primary-fixed rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3"><div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span></div><h2 className="font-headline-md text-headline-md text-on-surface">Total Users</h2></div>
            <div className="flex items-end gap-2 mt-auto"><span className="text-4xl font-bold font-headline-md text-primary">1,248</span><span className="font-label-sm text-label-sm text-secondary-fixed-dim flex items-center"><span className="material-symbols-outlined text-sm">trending_up</span> +12% this week</span></div>
          </div>

          <div className="bg-surface-container-lowest border-2 border-secondary-container rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3"><div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span></div><h2 className="font-headline-md text-headline-md text-on-surface">Active Sessions</h2></div>
            <div className="flex items-end gap-2 mt-auto"><span className="text-4xl font-bold font-headline-md text-secondary">342</span><span className="font-label-sm text-label-sm text-on-surface-variant">Currently in labs</span></div>
          </div>

          <div className="bg-surface-container-lowest border-2 border-tertiary-fixed rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3"><div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>report</span></div><h2 className="font-headline-md text-headline-md text-on-surface">Pending Requests</h2></div>
            <div className="flex items-end gap-2 mt-auto"><span className="text-4xl font-bold font-headline-md text-tertiary">15</span><span className="font-label-sm text-label-sm text-on-surface-variant">Requires approval</span></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-unit gap-4">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-outline-variant bg-surface-container-lowest text-on-surface focus:border-primary focus:ring-0 font-body-md text-body-md transition-all shadow-sm" placeholder="Search students, teachers, or IDs..." type="text" />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-outline-variant bg-surface-container-lowest text-on-surface font-label-sm text-label-sm hover:shadow-md transition-shadow flex-1 md:flex-none"><span className="material-symbols-outlined">filter_list</span>Filter</button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-primary-fixed-dim bg-primary text-on-primary font-label-sm text-label-sm hover:shadow-md transition-shadow flex-1 md:flex-none shadow-[0_4px_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-1"><span className="material-symbols-outlined">person_add</span>Add User</button>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-[2rem] border-2 border-primary-fixed overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container border-b-2 border-surface-variant">
                  <th className="p-4 font-label-sm text-label-sm text-on-surface-variant">User</th>
                  <th className="p-4 font-label-sm text-label-sm text-on-surface-variant">Role</th>
                  <th className="p-4 font-label-sm text-label-sm text-on-surface-variant">Lab Status</th>
                  <th className="p-4 font-label-sm text-label-sm text-on-surface-variant">Last Active</th>
                  <th className="p-4 font-label-sm text-label-sm text-on-surface-variant text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md">
                {[
                  { initials: 'AL', name: 'Alex Mercer', email: 'alex.m@chemlab.edu', role: 'Student', online: true, last: 'Just now', roleColor: 'border-secondary text-secondary', avatarBg: 'bg-primary-container text-on-primary-container' },
                  { initials: 'DR', name: 'Dr. Sarah Jenkins', email: 's.jenkins@chemlab.edu', role: 'Teacher', online: false, last: '2 hours ago', roleColor: 'border-primary text-primary', avatarBg: 'bg-tertiary-container text-on-tertiary-container' },
                  { initials: 'MJ', name: 'Marcus Johnson', email: 'marcus.j@chemlab.edu', role: 'Student', online: true, last: '5 mins ago', roleColor: 'border-secondary text-secondary', avatarBg: 'bg-primary-container text-on-primary-container' },
                ].map((u) => (
                  <tr key={u.email} className="border-b border-surface-variant hover:bg-surface-container-low transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${u.avatarBg} flex items-center justify-center font-bold`}>{u.initials}</div>
                        <div>
                          <div className="font-bold text-on-surface">{u.name}</div>
                          <div className="text-sm text-on-surface-variant">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4"><span className={`inline-flex items-center px-3 py-1 rounded-full border-2 bg-surface font-label-sm text-[12px] ${u.roleColor}`}>{u.role}</span></td>
                    <td className="p-4">
                      {u.online ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[12px]"><span className="w-2 h-2 rounded-full bg-on-secondary-container"></span> Online</span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-[12px]"><span className="w-2 h-2 rounded-full bg-outline"></span> Offline</span>
                      )}
                    </td>
                    <td className="p-4 text-on-surface-variant">{u.last}</td>
                    <td className="p-4 text-right">
                      <button className="p-2 text-outline hover:text-primary transition-colors rounded-full hover:bg-primary-container/10"><span className="material-symbols-outlined">edit</span></button>
                      <button className="p-2 text-outline hover:text-error transition-colors rounded-full hover:bg-error-container"><span className="material-symbols-outlined">delete</span></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-surface-container-lowest border-t border-surface-variant flex justify-between items-center">
            <span className="font-body-md text-sm text-on-surface-variant">Showing 1 to 3 of 1,248 users</span>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border-2 border-outline-variant flex items-center justify-center text-outline hover:text-primary hover:border-primary transition-colors disabled:opacity-50" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-full border-2 border-outline-variant flex items-center justify-center text-outline hover:text-primary hover:border-primary transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
