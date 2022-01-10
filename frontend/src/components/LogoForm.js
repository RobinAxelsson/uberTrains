import Logo from '../resources/logo_transparent.png';
export default function LogoForm() {
  return (
    <div className="flex justify-center items-center">
      <form className="mt-6 bg-white flex justify-center items-center bg-opacity-75 border-opacity-5 w-11/12 tablet:w-6/12 laptop:w-4/12 rounded-md shadow-md">
        <img class="h-64 w-64" src={Logo}></img>
      </form>
    </div>
  );
}
