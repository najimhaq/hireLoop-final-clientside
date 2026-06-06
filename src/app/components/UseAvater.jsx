'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const UseAvater = ({ user, className = 'h-8 w-8' }) => {
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initial = mounted ? user?.name?.charAt(0)?.toUpperCase() || 'U' : 'U';
  const showImage = mounted && !!user?.image && !imageError;

  return (
    <div className={`relative overflow-hidden rounded-full ${className}`}>
      {showImage ? (
        <Image
          src={user.image}
          alt={user?.name || 'User'}
          width={40}
          height={40}
          className='h-full w-full object-cover'
          referrerPolicy='no-referrer'
          onError={() => setImageError(true)}
          unoptimized
        />
      ) : (
        <div className='flex h-full w-full items-center justify-center bg-linear-to-br from-cyan-400 to-cyan-600 text-sm font-semibold text-white'>
          {initial}
        </div>
      )}
    </div>
  );
};

export default UseAvater;
