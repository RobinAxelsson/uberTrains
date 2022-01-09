import Logo from '../resources/logo_transparent.png';
export default function LogoForm() {
    return (
        <div className="flex justify-center items-center">
        <form className="bg-white justify-center bg-opacity-75 border-opacity-5 w-96 rounded-md shadow-md">
        <img class="mx-12  h-64 w-64" src={Logo}></img>
        </form>
       
      
    </div>

    );
}