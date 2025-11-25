import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  es: {
    translation: {
      hero: {
        title: "Elegancia eterna",
        subtitle:
          "Descubre nuestro catálogo con filtrado y paginación en el servidor.",
        explore: "Explorar",
        create: "Crear producto",
      },
      filters: {
        searchPlaceholder: "Buscar por nombre o marca",
        category: "Categoría",
        categories: {
          all: "Todos",
          dress: "Dress",
          sport: "Sport",
          diving: "Diving",
          aviation: "Aviation",
          complications: "Complications",
        },
        sort: "Ordenar",
        sortRecent: "Recientes",
        sortPriceAsc: "Precio ↑",
        sortPriceDesc: "Precio ↓",
        min: "Min",
        max: "Max",
        results: "Página {{page}} de {{pages}} • {{total}} piezas",
        emptyTitle: "No se encontraron productos",
        emptySubtitle: "Ajusta los filtros o crea un nuevo artículo.",
        create: "Crear producto",
        prev: "← Anterior",
        next: "Siguiente →",
      },
      auth: {
        signInTitle: "Iniciar sesión",
        signUpTitle: "Crear cuenta",
        email: "Correo",
        password: "Contraseña",
        fullName: "Nombre completo",
        submit: "Enviar",
      },
    },
  },
  en: {
    translation: {
      hero: {
        title: "Timeless elegance",
        subtitle:
          "Discover our catalog with server-side filtering and pagination.",
        explore: "Explore",
        create: "Create product",
      },
      filters: {
        searchPlaceholder: "Search by name or brand",
        category: "Category",
        categories: {
          all: "All",
          dress: "Dress",
          sport: "Sport",
          diving: "Diving",
          aviation: "Aviation",
          complications: "Complications",
        },
        sort: "Sort",
        sortRecent: "Newest",
        sortPriceAsc: "Price ↑",
        sortPriceDesc: "Price ↓",
        min: "Min",
        max: "Max",
        results: "Page {{page}} of {{pages}} • {{total}} pieces",
        emptyTitle: "No products found",
        emptySubtitle: "Try adjusting the filters or create a new item.",
        create: "Create product",
        prev: "← Previous",
        next: "Next →",
      },
      auth: {
        signInTitle: "Sign In",
        signUpTitle: "Create account",
        email: "Email",
        password: "Password",
        fullName: "Full name",
        submit: "Continue",
      },
    },
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "es",
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;

