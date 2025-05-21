import { redirect } from 'next/navigation';

export default function Login() {
  async function handlerRegisterAccount(formData: FormData) {
    'use server';
    const email = formData.get('email');
    const password = formData.get('password');
    console.log(email, password);
    redirect('/account');
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="d-flex justify-content-center align-items-center">
          <h2>Login</h2>
        </div>
        <form action={handlerRegisterAccount} className="">
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              e-mail
            </label>
            <input
              className="form-control"
              name="email"
              id="email"
              type="text"
              placeholder="seu e-mail"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              senha
            </label>
            <input
              className="form-control"
              name="password"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary" type="submit">
              entrar
            </button>
            <button className="btn btn-link" type="submit">
              esqueceu a senha?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
