import { clsx } from 'clsx';
import Link from 'next/link';



export default function Breadcrumbs({breadcrumbs}) {
    
  return (
    <nav aria-label="Breadcrumb" className="my-3 block">
      <ol className={clsx('flex text-md md:text-lg')}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? 'text-gray-900' : 'text-gray-500',
            )}
          >
            <Link href={breadcrumb.href} className='capitalize'>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
