const Footer = () => {
  return (
    <footer class="mt-4 bg-white bg-opacity-75 shadow-md rounded-md fixed bottom-0 w-full">
      <div class="max-w-7xl mx-auto py-1 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          class="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          <div class="px-5 py-2">
            <a
              href={() => false}
              class="text-base text-gray-500 hover:text-gray-900 font-medium underline" 
            >
              Kontakta oss
            </a>
          </div>

        </nav>
        <p class="mt-8 text-center text-base text-gray-400">
          &copy; 2022 UberTrains, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
