import { useRouter } from "next/router";

export default function AuthForm() {
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    router.push("/admin/users");
  }

  return (
    <div className="bg-slate-100 w-screen h-screen">
      <div className="flex justify-center items-center h-full">
        <form
          className="bg-white rounded w-2/6 h-3/5 flex justify-evenly flex-col items-center text-black"
          onSubmit={handleSubmit}
        >
          <h2>Signin to your account</h2>
          <div>
            <h2>Email</h2>
            <input
              required
              placeholder="john@doe.com"
              type="email"
              name="email"
              className={"p-2 w-96 h-12 rounded bg-slate-100"}
            />
          </div>
          <div>
            <h2>Password</h2>
            <input
              required
              placeholder="123456 is not a good idea"
              type="password"
              name="password"
              className={"p-2 w-96 h-12 rounded bg-slate-100"}
            />
          </div>
          <button type="submit">Signin</button>
        </form>
      </div>
    </div>
  );
}
