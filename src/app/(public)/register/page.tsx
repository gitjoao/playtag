export default function Register() {

  async function handlerRegisterAccount(formData: FormData) {
    'use server'
    const email = formData.get('email')
    const password = formData.get('password')
    console.log(email, password)
  }

  return <div>
    <h1>Pagina de registro</h1>
    <form action={handlerRegisterAccount}>
      <input type="text" placeholder="email" name="email" />
      <input type="password" placeholder="senha" name="password"/>

      <button type="submit" >cadastro</button>
    </form>
  </div>
}
