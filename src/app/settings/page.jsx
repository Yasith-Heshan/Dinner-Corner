'use client';
import { useEffect, useState } from 'react';
import { fetchShopStatus, handleShopOpen } from '@/utils/firebaseFunctions';
import Spinner from '@/components/Spinner/Spinner';
import { HOME } from '@/utils/routes';
import { useRouter } from 'next/navigation';
import { UserAuth } from '@/app/context/AuthContext';

const Settings = () => {
  const { user } = UserAuth();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        router.push(HOME);
      }
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    fetchShopStatus()
      .then((status) => {
        setOpen(status.shopOpen);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleToggle = async () => {
    setOpen(!open);
    await handleShopOpen(!open);
  };
  return (
    <div className={'flex justify-center items-center w-full h-[80vh]'}>
      <div className={'flex justify-center items-center bg-gray-600 min-w-60 h-32 rounded-lg'}>
        {loading ? (
          <Spinner />
        ) : (
          <label className='relative inline-flex items-center cursor-pointer'>
            <input
              checked={open}
              onChange={handleToggle}
              type='checkbox'
              value=''
              className='sr-only peer'
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
              {open ? 'Close' : 'Open'} Shop
            </span>
          </label>
        )}
      </div>
    </div>
  );
};

export default Settings;
