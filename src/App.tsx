import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createUserFormSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório").transform(name => {
    return name.trim().split(" ").map(word => {
    return word[0].toUpperCase().concat(word.substring(1))
  }).join(" ")}),
  email: z.string().nonempty("O e-mail é obrigatório").email("Formato de e-mail inválido").toLowerCase()
    .refine(email => {
    return email.endsWith("@gmail.com")
  }, "O e-mail precisa ser do Google"),
  password: z.string().min(6, "A senha de no mínimo 6 caracteres")
})

type CreateUserFormaData = z.infer<typeof createUserFormSchema>
export default function App() {
  const [data, setData] = useState<CreateUserFormaData>()
  const { register, handleSubmit, formState: {errors} } = useForm<CreateUserFormaData>({
    resolver: zodResolver(createUserFormSchema)
  })

  function createUser(data: CreateUserFormaData) {
    setData(data)
  }

  return (
    <main className="h-screen bg-zinc-950  items-center justify-center flex flex-col gap-3">
      <form onSubmit={handleSubmit( createUser)}
        className="flex flex-col gap-2 w-full max-w-xs text-zinc-300 ">
        <div className="flex flex-col gap-1">
          <label htmlFor="">Nome</label>
          <input type="text" title="name" placeholder="Nome"
            className="rounded h-10 px-2 bg-zinc-900  text-white focus:border-zinc-600"
            {...register("name")}
          />
          {errors.name && <span className='text-sm text-red-400'>{errors.name.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">E-mail</label>
          <input type="email" title="email" placeholder="E-mail"
            className="rounded h-10 px-2 bg-zinc-900  text-white focus:border-zinc-600"
            {...register("email")}
          />
          {errors.email && <span className='text-sm text-red-400'>{errors.email.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Password</label>
          <input type="password" title="Password" placeholder="Senha"
            className="rounded h-10 px-2 bg-zinc-900  text-white focus:border-zinc-600"
            {...register("password")}
          />
          {errors.password && <span className='text-sm text-red-400'>{errors.password.message}</span>}
        </div>

        <button
          type='submit'
          className="bg-emerald-500 font-semibold h-10 rounded hover:bg-emerald-600 text-white"
        >Salvar</button>
      </form>
      
      <pre
        className='text-zinc-300'
      >{JSON.stringify(data,null,2)}</pre>
      
    </main>
  )
}


