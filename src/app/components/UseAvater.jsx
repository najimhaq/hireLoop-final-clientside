import Image from 'next/image';
import { useState } from 'react';

const UseAvater = ({ user }) => {
  const [imageError, setImageError] = useState(false);
  return (
    <div>
      {user && (
        <div className='relative'>
          {user.image && !imageError ? (
            <Image
              src={user.image}
              alt={user.name}
              width={32}
              height={32}
              className='rounded-full object-cover border-2 border-cyan-200'
              referrerPolicy='no-referrer'
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <div className='w-8 h-8 rounded-full bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white font-semibold text-sm'>
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UseAvater;
