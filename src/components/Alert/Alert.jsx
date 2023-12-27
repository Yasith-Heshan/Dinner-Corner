const Alert = ({ success, msg }) => {
  return (
    <>
      {success ? (
        <div
          className='p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400'
          role='alert'
        >
          <span className='font-medium'>Success!</span> {msg}
        </div>
      ) : (
        <div
          className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
          role='alert'
        >
          <span className='font-medium'>Error!</span> {msg}
        </div>
      )}
    </>
  );
};

export default Alert;
