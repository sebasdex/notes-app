import React from 'react'

function page() {
    return (
        <section>
            <form action="" className='flex flex-col gap-4'>
                <h1 className='text-2xl font-bold text-slate-200'>Login</h1>
                <input type="text" placeholder="Username" className='px-4 py-2 rounded-md border-2 border-slate-500 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400' />
                <input type="password" placeholder="Password" className='px-4 py-2 rounded-md border-2 border-slate-500 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400' />
                <button type="submit" className='px-4 py-2 rounded-md bg-slate-500 text-white hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400'>Login</button>
            </form>
        </section>
    )
}

export default page