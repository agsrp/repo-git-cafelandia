
document.addEventListener('DOMContentLoaded', () => {
    let carrito = [];
    const carritoLista = document.getElementById('carrito-lista');
    const totalElemento = document.getElementById('total');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', agregarAlCarrito);
    });

    document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);

    function agregarAlCarrito(event) {
        const producto = event.target.closest('.col-md-4');
        const titulo = producto.querySelector('.card-title').textContent;
        const precio = parseInt(producto.getAttribute('data-price'));

        const itemCarrito = carrito.find(item => item.titulo === titulo);

        if (itemCarrito) {
            itemCarrito.cantidad++;
        } else {
            carrito.push({ titulo, precio, cantidad: 1 });
        }

        actualizarCarrito();
        
    document.getElementById('carrito').classList.remove('d-none');
    }

    

    function eliminarDelCarrito(event) {
        const titulo = event.target.getAttribute('data-titulo');
        carrito = carrito.filter(item => item.titulo !== titulo);
        actualizarCarrito();
    }

    function actualizarCarrito() {
        carritoLista.innerHTML = '';
        let total = 0;
    
        carrito.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.titulo} - $${item.precio} x ${item.cantidad}`;
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.setAttribute('data-titulo', item.titulo);
            btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
            btnEliminar.addEventListener('click', eliminarDelCarrito);
            li.appendChild(btnEliminar);
            carritoLista.appendChild(li);
            total += item.precio * item.cantidad;
        });
    
        totalElemento.textContent = `Total: $${total}`;
    
        // Verificar si el carrito está vacío para ocultar la sección del carrito
        if (carrito.length > 0) {
            document.getElementById('carrito').classList.add('visible');
        } else {
            document.getElementById('carrito').classList.remove('visible');
        }
    }
    

    function finalizarCompra() {
        if (carrito.length === 0) {
            alert('El carrito está vacío');
        } else {
            alert(`Compra finalizada. Total a pagar: $${carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)}`);
            carrito = [];
            actualizarCarrito();
        }
    }
});
