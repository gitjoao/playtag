import { redirect } from "next/navigation"

export default function Login() {

  async function handlerRegisterAccount(formData: FormData) {
    'use server'
    const email = formData.get('email')
    const password = formData.get('password')
    console.log(email, password)
    redirect('/account')
  }

  return (
    <div className="max-w-sm mx-auto m-10 bg-white rounded-2xl shadow-md p-6 space-y-4">
  <form action={handlerRegisterAccount} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        e-mail
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='email' id="email" type="text" placeholder="seu e-mail" />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        <p></p>senha
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name='password' id="password" type="password" placeholder="******************" />
      {/* border-red-500 */}
      {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        entrar
      </button>
      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        esqueceu a senha?
      </a>
    </div>
  </form>
</div>
  );
}
