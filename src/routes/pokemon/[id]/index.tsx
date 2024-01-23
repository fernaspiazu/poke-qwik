import { component$ } from "@builder.io/qwik"
import { useLocation } from "@builder.io/qwik-city"

export default component$(() => {
    const location = useLocation()
    return (
        <>
            <span class="text-5xl">Pokemon: { location.params.id } </span>
        </>
    )
})
