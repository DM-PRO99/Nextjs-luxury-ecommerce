describe("Store page", () => {
  const mockResponse = {
    data: [
      {
        id: "p1",
        name: "Perpetual Chronograph",
        brand: "Chronos",
        collection: "Heritage",
        description: "Legendary Swiss chronograph.",
        shortDescription: "Limited edition",
        price: 12500,
        originalPrice: 14900,
        currency: "USD",
        features: ["Calibre CH-500"],
        specifications: {
          movement: "Automatic",
          caseMaterial: "Rose Gold",
          caseDiameter: "42mm",
          waterResistance: "50m",
          crystal: "Sapphire",
          strap: "Leather",
        },
        images: {
          main: {
            url: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
            publicId: "p1-main",
            alt: "Perpetual Chronograph",
          },
          gallery: [
            {
              url: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
              publicId: "p1-gallery-1",
              alt: "Perpetual Chronograph angle",
            },
          ],
        },
        inStock: true,
        stock: 4,
        isNew: true,
        isFeatured: true,
        rating: 4.9,
        reviewCount: 120,
        category: "dress",
        tags: ["limited"],
      },
    ],
    pagination: {
      page: 1,
      limit: 9,
      total: 1,
      totalPages: 1,
    },
  };

  beforeEach(() => {
    cy.intercept("GET", "**/api/products*", (req) => {
      req.reply(mockResponse);
    }).as("getProducts");
  });

  it("renders hero, filters and product cards with server pagination", () => {
    cy.visit("/store");
    cy.wait("@getProducts");

    cy.contains("Elegancia eterna").should("exist");
    cy.get('input[placeholder="Buscar por nombre o marca"]').type("Perpetual");
    cy.url().should("include", "search=Perpetual");

    cy.wait("@getProducts");
    cy.contains("Perpetual Chronograph").should("exist");

    cy.get('select[name="category"]').select("Sport").should("have.value", "sport");
    cy.url().should("include", "category=sport");

    cy.contains("← Anterior").should("be.disabled");
    cy.contains("Siguiente →").should("be.disabled");
  });
});

