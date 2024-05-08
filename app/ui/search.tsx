// This is a Client Component, which means you can use event listeners and hooks.

'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
// limits the rate at which a function can fire.
// In our case, you only want to query the database when the user has stopped typing.
import { useDebouncedCallback } from 'use-debounce';


// Import the useSearchParams hook from 'next/navigation', and assign it to a variable
// export default function Search() {
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // This function will wrap the contents of handleSearch, 
  // and only run the code after a specific time once the user has stopped typing (300ms).
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
                  // get the params string like ?page=1&query=a
    const params = new URLSearchParams(searchParams);
    // when the user types a new search query... reset the page number to 1.
    params.set('page', '1');
    if (term) {
      params.set('query',term);
    } else {
      params.delete('query')
    }
    // ${pathname} is the current path
    // user types -- params.toString() translates this input into a URL-friendly format
    // replace(${pathname}?${params.toString()}) updates the URL
    // The URL is updated without reloading the page
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input   // search input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        // Keeping the URL and input in sync
        // To ensure the input field is in sync with the URL and will be populated when sharing
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
