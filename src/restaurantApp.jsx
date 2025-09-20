
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Plus, Minus, X, MapPin, Phone, Clock, Star, ChevronRight, Instagram, Facebook, Twitter, Menu, Check, Heart, Users, Sun, Moon, Globe, Quote, ChevronLeft, User, Mail, MessageCircle } from 'lucide-react';
import { supabase } from '../supabaseClient.js';
const RestaurantWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);  
  const [language, setLanguage] = useState('en');
  // removed top-level customerDetails to avoid full-app re-renders when typing in cart
 // Admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminError, setAdminError] = useState('');
  // Translations
  const translations = {
    en: {
      name: "CHICKO'S",
      tagline: "Authentic Flavors, Made with Love",
      home: "Home",
      menu: "Menu",
      about: "About",
      contact: "Contact",
      cart: "Cart",
      orderNow: "Order Now",
      viewFullMenu: "View Full Menu",
      featured: "Featured",
      featuredDishes: "Featured Dishes",
      chefRecommendations: "Our chef's special recommendations",
      yourCart: "Your Cart",
      cartEmpty: "Your cart is empty",
      addItems: "Add some delicious items to get started!",
      browseMenu: "Browse Menu",
      deliveryInfo: "Delivery Information",
      fullName: "Full Name",
      phone: "Phone Number",
      deliveryAddress: "Delivery Address",
      paymentMethod: "Payment Method",
      cashOnDelivery: "Cash on Delivery",
      placeOrder: "Place Order via WhatsApp",
      total: "Total",
      quantity: "Quantity",
      specialInstructions: "Special Instructions",
      addToCart: "Add to Cart",
      add: "Add",
      aboutUs: "About Us",
      aboutText: "Welcome to CHICKO'S, where every dish tells a story of passion, tradition, and culinary excellence. Our journey began with a simple dream: to bring authentic flavors to your table.",
      ourStory: "Our Story",
      storyText: "Founded in 2020, CHICKO'S has become Casablanca's favorite destination for authentic cuisine. Our chefs bring years of experience and a genuine love for food.",
      reviews: "Customer Reviews",
      location: "Location",
      findUs: "Find Us Here",
      quickLinks: "Quick Links",
      contactInfo: "Contact Info",
      followUs: "Follow Us",
      rights: "All rights reserved",
      happyCustomers: "Happy Customers",
      avgRating: "Average Rating",
      madeWith: "Made With Love",
      currency: "MAD",
      adminLogin: "Admin Login",
      adminPassword: "Password",
      adminEnterPassword: "Enter admin password",
      adminAddItem: "Add Menu Item",
      adminLogout: "Logout",
      itemTitle: "Item Title",
      imageUpload: "Image Upload",
      itemDescription: "Item Description",
      itemCategory: "Category",
      itemPrice: "Price (MAD)",
      itemExtras: "Extras (key:price pairs)",
      itemFeatured: "Mark as featured",
      adminSubmit: "Add Item"
    },
    fr: {
      name: "CHICKO'S",
      tagline: "Saveurs Authentiques, Faites avec Amour",
      home: "Accueil",
      menu: "Menu",
      about: "À propos",
      contact: "Contact",
      cart: "Panier",
      orderNow: "Commander Maintenant",
      viewFullMenu: "Voir le Menu Complet",
      featured: "En vedette",
      featuredDishes: "Plats Vedettes",
      chefRecommendations: "Recommandations spéciales de notre chef",
      yourCart: "Votre Panier",
      cartEmpty: "Votre panier est vide",
      addItems: "Ajoutez des délicieux articles pour commencer!",
      browseMenu: "Parcourir le Menu",
      deliveryInfo: "Informations de Livraison",
      fullName: "Nom Complet",
      phone: "Numéro de Téléphone",
      deliveryAddress: "Adresse de Livraison",
      paymentMethod: "Mode de Paiement",
      cashOnDelivery: "Paiement à la Livraison",
      placeOrder: "Commander via WhatsApp",
      total: "Total",
      quantity: "Quantité",
      specialInstructions: "Instructions Spéciales",
      addToCart: "Ajouter au Panier",
      add: "Ajouter",
      aboutUs: "À Propos de Nous",
      aboutText: "Bienvenue chez CHICKO'S, où chaque plat raconte une histoire de passion, de tradition et d'excellence culinaire. Notre voyage a commencé avec un rêve simple : apporter des saveurs authentiques à votre table.",
      ourStory: "Notre Histoire",
      storyText: "Fondé en 2020, CHICKO'S est devenu la destination préférée de Casablanca pour une cuisine authentique. Nos chefs apportent des années d'expérience et un véritable amour pour la nourriture.",
      reviews: "Avis Clients",
      location: "Location",
      findUs: "Nous Trouver Ici",
      quickLinks: "Liens Rapides",
      contactInfo: "Informations de Contact",
      followUs: "Suivez-nous",
      rights: "Tous droits réservés",
      happyCustomers: "Clients Satisfaits",
      avgRating: "Note Moyenne",
      madeWith: "Fait avec Amour",
      currency: "MAD",
      adminLogin: "Connexion Admin",
      adminPassword: "Mot de passe",
      adminEnterPassword: "Entrez le mot de passe admin",
      adminAddItem: "Ajouter un Plat",
      adminLogout: "Se déconnecter",
      itemTitle: "Titre",
      imageUpload: "Téléverser une image",
      itemDescription: "Description",
      itemCategory: "Catégorie",
      itemPrice: "Prix (MAD)",
      itemExtras: "Extras (clé:prix)",
      itemFeatured: "Mettre en avant",
      adminSubmit: "Ajouter"
    },
    ar: {
      name: "شيكوز",
      tagline: "نكهات أصيلة، مصنوعة بحب",
      home: "الرئيسية",
      menu: "القائمة",
      about: "عنا",
      contact: "اتصل",
      cart: "السلة",
      orderNow: "اطلب الآن",
      viewFullMenu: "عرض القائمة الكاملة",
      featured: "مميز",
      featuredDishes: "الأطباق المميزة",
      chefRecommendations: "توصيات خاصة من الشيف",
      yourCart: "سلتك",
      cartEmpty: "سلتك فارغة",
      addItems: "أضف بعض العناصر اللذيذة للبدء!",
      browseMenu: "تصفح القائمة",
      deliveryInfo: "معلومات التوصيل",
      fullName: "الاسم الكامل",
      phone: "رقم الهاتف",
      deliveryAddress: "عنوان التوصيل",
      paymentMethod: "طريقة الدفع",
      cashOnDelivery: "الدفع عند التسليم",
      placeOrder: "اطلب عبر واتساب",
      total: "المجموع",
      quantity: "الكمية",
      specialInstructions: "تعليمات خاصة",
      addToCart: "أضف إلى السلة",
      add: "أضف",
      aboutUs: "من نحن",
      aboutText: "مرحبًا بكم في شيكوز، حيث يحكي كل طبق قصة من الشغف والتقاليد والتميز في الطهي. بدأت رحلتنا بحلم بسيط: إحضار النكهات الأصيلة إلى مائدتك.",
      ourStory: "قصتنا",
      storyText: "تأسس شيكوز في عام 2020، وأصبح الوجهة المفضلة في الدار البيضاء للمأكولات الأصيلة. يجلب طهاتنا سنوات من الخبرة وحبًا حقيقيًا للطعام.",
      reviews: "آراء العملاء",
      location: "موقعنا",
      findUs: "اعثر علينا هنا",
      quickLinks: "روابط سريعة",
      contactInfo: "معلومات الاتصال",
      followUs: "تابعنا",
      rights: "جميع الحقوق محفوظة",
      happyCustomers: "عملاء سعداء",
      avgRating: "التقييم المتوسط",
      madeWith: "صنع بحب",
      currency: "درهم",
      adminLogin: "تسجيل دخول المسؤول",
      adminPassword: "كلمة المرور",
      adminEnterPassword: "أدخل كلمة مرور المسؤول",
      adminAddItem: "إضافة عنصر للقائمة",
      adminLogout: "تسجيل الخروج",
      itemTitle: "عنوان العنصر",
      imageUpload: "رفع صورة",
      itemDescription: "وصف العنصر",
      itemCategory: "الفئة",
      itemPrice: "السعر (درهم)",
      itemExtras: "إضافات (مفتاح:سعر)",
      itemFeatured: "تمييز كمعروض",
      adminSubmit: "إضافة"
    }
  };

  const t = (key) => translations[language][key] || key;

  // Restaurant configuration
  const restaurantConfig = {
    name: "Restaurant",
    tagline: t('tagline'),
    whatsappNumber: "+212634619265",
    address: "123 Flavor Street, Casablanca",
    phone: "+212 5XX-XXXXXX",
    hours: "11:00 AM - 10:00 PM",
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      twitter: "https://twitter.com"
    }
  };

  // Menu data with MAD prices
  const initialMenuData = {
    appetizers: [
      {
        id: 1,
        name: "Bruschetta Trio",
        description: "Fresh tomatoes, basil, and mozzarella on toasted artisan bread",
        price: 89,
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400",
        featured: true,
        options: {
          size: ['Regular', 'Large'],
          extras: ['Extra Cheese', 'Extra Basil']
        }
      },
      {
        id: 10,
        name: "Tacos mixte",
        description: "Fresh tomatoes, basil, and mozzarella on toasted artisan bread",
        price: 50,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
        featured: true,
        options: {
          size: ['Regular', 'Large'],
          extras: ['Extra Cheese', 'Extra Basil']
        }
      },
      {
        id: 2,
        name: "Calamari Fritti",
        description: "Golden fried squid rings with zesty marinara sauce",
        price: 129,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400",
        options: {
          spiceLevel: ['Mild', 'Medium', 'Hot'],
          extras: ['Extra Sauce']
        }
      }
    ],
    mains: [
      {
        id: 3,
        name: "Grilled Salmon",
        description: "Atlantic salmon with lemon butter sauce, seasonal vegetables",
        price: 249,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
        featured: true,
        options: {
          cookingStyle: ['Grilled', 'Pan-Seared'],
          sides: ['Mashed Potatoes', 'Rice', 'Vegetables']
        }
      },
      {
        id: 4,
        name: "Ribeye Steak",
        description: "Premium cut ribeye with herb butter and roasted potatoes",
        price: 329,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
        featured: true,
        options: {
          cookingLevel: ['Rare', 'Medium Rare', 'Medium', 'Well Done'],
          sides: ['Fries', 'Mashed Potatoes', 'Salad']
        }
      },
      {
        id: 5,
        name: "Pasta Carbonara",
        description: "Classic Italian pasta with pancetta, egg, and parmesan",
        price: 189,
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400",
        options: {
          pasta: ['Spaghetti', 'Fettuccine', 'Penne'],
          extras: ['Extra Cheese', 'Extra Pancetta']
        }
      }
    ],
    desserts: [
      {
        id: 6,
        name: "Tiramisu",
        description: "Traditional Italian dessert with espresso and mascarpone",
        price: 79,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
        featured: true,
        options: {
          size: ['Regular', 'Large']
        }
      },
      {
        id: 7,
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center, vanilla ice cream",
        price: 89,
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400",
        options: {
          extras: ['Extra Ice Cream', 'Whipped Cream']
        }
      }
    ],
    beverages: [
     {
      id: 1,
      name: "Bruschetta Trio",
      description: "Fresh tomatoes, basil, and mozzarella on toasted artisan bread",
      price: 89,
      image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400",
      featured: true,
      options: {
          size: {
            options: ['Regular', 'Large'],
            prices: { 'Regular': 0, 'Large': 10 }
          },
          extras: {
            options: ['Sugar', 'Extra Ice'],
            prices: { 'Sugar': 0, 'Extra Ice': 0 }
          }
        }
    },
      {
        id: 9,
        name: "Espresso",
        description: "Rich Italian espresso",
        price: 39,
        image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400",
        options: {
          shots: ['Single', 'Double'],
          extras: ['Sugar', 'Milk']
        }
      }
    ]
  };


  // Load saved menu from localStorage if present; otherwise use initialMenuData
  const MENU_STORAGE_KEY = 'chickos_menu_v1';
  const DELETED_STORAGE_KEY = 'chickos_deleted_v1';
  const [menuDataState, setMenuDataState] = useState(initialMenuData);

useEffect(() => {
  const loadMenu = async () => {
    const { data, error } = await supabase.from('menu_items').select('*');
    if (error) {
      console.error('Error loading menu:', error);
    } else {
      // group by category since your UI expects categories
      const grouped = { appetizers: [], mains: [], desserts: [], beverages: [] };
      data.forEach(item => {
        if (!grouped[item.category]) grouped[item.category] = [];
        grouped[item.category].push(item);
      });
      setMenuDataState(grouped);
    }
  };
  loadMenu();
}, []);


  // deleted items (soft-deleted) persisted separately so admin can restore
  const [deletedItems, setDeletedItems] = useState(() => {
    try {
      const raw = localStorage.getItem(DELETED_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  });

  // pending delete state for in-app confirmation
  const [pendingDeleteItem, setPendingDeleteItem] = useState(null);

  // persist menu changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menuDataState));
    } catch (e) {
      console.warn('Failed to save menu data', e);
    }
  }, [menuDataState]);

  // persist deleted items
  useEffect(() => {
    try { localStorage.setItem(DELETED_STORAGE_KEY, JSON.stringify(deletedItems)); } catch (e) { }
  }, [deletedItems]);

  // derive lists
  const allMenuItems = [
    ...menuDataState.appetizers,
    ...menuDataState.mains,
    ...menuDataState.desserts,
    ...menuDataState.beverages
  ];
  const featuredItems = allMenuItems.filter(item => item.featured);


  // Apply theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
 // Helper: compute extra price additions given item definition and selectedOptions
  const computeExtraPrice = (item, selectedOptions = {}) => {
    if (!item || !item.options) return 0;
    let extra = 0;
    Object.entries(selectedOptions).forEach(([optKey, optValue]) => {
      const def = item.options[optKey];
      if (!def) return;

      // If definition has a prices map (object-shape options)
      if (def && typeof def === 'object' && !Array.isArray(def) && def.prices) {
        const priceMap = def.prices || {};
        if (Array.isArray(optValue)) {
          optValue.forEach(v => {
            const key = String(v);
            extra += Number(priceMap[key] || 0);
          });
        } else {
          const key = String(optValue);
          extra += Number(priceMap[key] || 0);
        }
        return;
      }

      // For simple arrays where extras are options listed without prices,
      // there may be an 'extras' option elsewhere with prices; try to locate price map
      if (Array.isArray(def)) {
        // no prices available for these options -> assume 0
        return;
      }

      // If definition is object with options and prices nested differently
      if (def && typeof def === 'object' && !Array.isArray(def) && def.options && def.prices) {
        const priceMap = def.prices || {};
        if (Array.isArray(optValue)) {
          optValue.forEach(v => { extra += Number(priceMap[String(v)] || 0); });
        } else {
          extra += Number(priceMap[String(optValue)] || 0);
        }
        return;
      }
    });
    return extra;
  };

  
  // Cart functions
  const addToCart = (item, selectedOptions = {}, quantity = 1, specialInstructions = '') => {
    // compute extras
    const extraPrice = computeExtraPrice(item, selectedOptions);
    const itemPrice = Number(item.price || 0);
    const subtotal = (itemPrice + extraPrice) * Math.max(1, quantity);

    const cartItem = {
      ...item,
      cartId: Date.now() + Math.floor(Math.random() * 1000),
      selectedOptions,
      quantity,
      specialInstructions,
      extrasPrice: extraPrice,
      subtotal: Math.round(subtotal)
    };
    setCart(prev => [...prev, cartItem]);
    setShowItemModal(false);
    setSelectedItem(null);
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, change) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQuantity = Math.max(1, item.quantity + change);
        const newSubtotal = Math.round((Number(item.price || 0) + Number(item.extrasPrice || 0)) * newQuantity);
        return { ...item, quantity: newQuantity, subtotal: newSubtotal };
      }
      return item;
    }));
  };


  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.subtotal, 0).toFixed(0);
  };

  // Remove an item from the menu (secret Alt+Click on cards)
  // request removal: open confirmation modal (use in-app confirmation instead of window.confirm)
  const removeItemFromMenu = (targetItem) => {
    if (!targetItem) return;
    setPendingDeleteItem(targetItem);
  };

  // perform actual removal after user confirms
  const performRemove = (targetItem) => {
    if (!targetItem) return;
    // Remove from each category if present and move to deletedItems (soft-delete)
    const newMenu = { ...menuDataState };
    const removed = [];
    ['appetizers', 'mains', 'desserts', 'beverages'].forEach(cat => {
      if (!Array.isArray(newMenu[cat])) return;
      const before = newMenu[cat];
      const after = before.filter(it => !(it.id === targetItem.id && it.name === targetItem.name));
      const diff = before.filter(it => after.indexOf(it) === -1);
      if (diff.length > 0) removed.push(...diff);
      newMenu[cat] = after;
    });

    if (removed.length > 0) {
      setMenuDataState(newMenu);
      try { localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(newMenu)); } catch (e) { }

      // add to deleted list with a timestamp so admin can restore/edit
      const withMeta = removed.map(it => ({ ...it, deletedAt: Date.now() }));
      setDeletedItems(prev => [...withMeta, ...prev]);

      // Remove any matching items in the cart
      setCart(prev => prev.filter(ci => !(ci.id === targetItem.id && ci.name === targetItem.name)));

      // If the modal for this item is open, close it
      if (selectedItem && selectedItem.id === targetItem.id && selectedItem.name === targetItem.name) {
        setShowItemModal(false);
        setSelectedItem(null);
      }

      // show undo snackbar
      setUndoSnackbar({ visible: true, items: withMeta, expiresAt: Date.now() + 6000 });
    }

    setPendingDeleteItem(null);
  };

  // undo snackbar state
  const [undoSnackbar, setUndoSnackbar] = useState({ visible: false, items: [], expiresAt: 0 });

  // auto-hide undo snackbar
  useEffect(() => {
    if (!undoSnackbar.visible) return;
    const now = Date.now();
    const ttl = Math.max(0, undoSnackbar.expiresAt - now);
    const id = setTimeout(() => setUndoSnackbar({ visible: false, items: [], expiresAt: 0 }), ttl);
    return () => clearTimeout(id);
  }, [undoSnackbar]);

  const undoDeletion = () => {
    if (!undoSnackbar.items || undoSnackbar.items.length === 0) return;
    // move back to menu's first category (preserve original category if saved in item)
    const restored = undoSnackbar.items.map(it => { const copy = { ...it }; delete copy.deletedAt; return copy; });
    setMenuDataState(prev => {
      const copy = { ...prev };
      restored.forEach(it => {
        // try to detect original category by id collisions — fallback to appetizers
        const foundCat = ['appetizers','mains','desserts','beverages'].find(cat => !!initialMenuData[cat].find(orig => orig.id === it.id)) || 'appetizers';
        if (!copy[foundCat]) copy[foundCat] = [];
        copy[foundCat] = [it, ...copy[foundCat]];
      });
      try { localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(copy)); } catch (e) { }
      return copy;
    });
    // remove from deletedItems
    setDeletedItems(prev => prev.filter(d => !undoSnackbar.items.find(u => u.id === d.id && u.name === d.name)));
    setUndoSnackbar({ visible: false, items: [], expiresAt: 0 });
  };

  const cancelPendingDelete = () => setPendingDeleteItem(null);

  // Long-press support for touch devices (call removeItemFromMenu on long press)
  const LONG_PRESS_MS = 700;
  const attachLongPressHandlers = (item) => {
    let timer = null;
    return {
      onTouchStart: (e) => {
        // start timer
        timer = setTimeout(() => {
          removeItemFromMenu(item);
          timer = null;
        }, LONG_PRESS_MS);
      },
      onTouchEnd: (e) => {
        if (timer) { clearTimeout(timer); timer = null; }
      },
      onTouchMove: (e) => {
        if (timer) { clearTimeout(timer); timer = null; }
      }
    };
  };

  // Item Modal Component
  const ItemModal = () => {
    const [quantity, setQuantity] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [specialInstructions, setSpecialInstructions] = useState('');

    useEffect(() => {
      if (selectedItem && selectedItem.options) {
        const defaultOptions = {};
        Object.entries(selectedItem.options).forEach(([key, values]) => {
          // values may be array or object with .options
          if (key.toLowerCase() === 'extras') {
            // extras should default to empty selection (multi-select)
            defaultOptions[key] = [];
          } else if (Array.isArray(values) && values.length > 0) {
            defaultOptions[key] = values[0];
          } else if (values && typeof values === 'object' && values.options && values.options.length > 0) {
            defaultOptions[key] = values.options[0];
          }
        });
        setSelectedOptions(defaultOptions);
      } else {
        setSelectedOptions({});
      }
    }, [selectedItem]);

    if (!selectedItem) return null;

    const extraPrice = computeExtraPrice(selectedItem, selectedOptions);
    const computedUnitPrice = Number(selectedItem.price || 0) + Number(extraPrice);
    const computedTotal = computedUnitPrice * Math.max(1, quantity);

    const renderOptionValues = (optionValues) => {
      // returns array of option strings
      if (Array.isArray(optionValues)) return optionValues;
      if (optionValues && typeof optionValues === 'object' && optionValues.options) return optionValues.options;
      return [];
    };


    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 ">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20 backdrop-blur-sm"
          onClick={() => setShowItemModal(false)}
        />
        <div className={`relative popup ${darkMode ? 'bg-gray-800' : 'bg-white'} max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-100 scale-100 animate-slideUp`}>
          <div className="relative">
            <img 
              src={selectedItem.image} 
              alt={selectedItem.name}
              className="w-full h-64 object-cover "
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-3xl" />
            <button
              onClick={() => setShowItemModal(false)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-lg transition-all hover:scale-110 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            <div className="absolute bottom-4 left-6 text-white">
              <h3 className="text-3xl font-bold mb-1">{selectedItem.name}</h3>
              <p className="text-white/90">{selectedItem.description}</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <p className="text-3xl font-bold text-red-600">{Math.round(computedUnitPrice)} {t('currency')}</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            {selectedItem.options && Object.entries(selectedItem.options).map(([optionKey, optionValues]) => {
              const optionsList = renderOptionValues(optionValues);
              return (
                <div key={optionKey} className="mb-5">
                  <label className={`block text-sm font-semibold mb-3 capitalize ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {optionKey.replace(/([A-Z])/g, ' $1').trim()}:
                  </label>
                  <div className="flex flex-wrap gap-2">
                          {optionsList.map((value) => {
                            const valueKey = `${optionKey}-${String(value)}`;
                            // extras can be multi-select
                            if (optionKey.toLowerCase() === 'extras') {
                              const current = Array.isArray(selectedOptions[optionKey]) ? selectedOptions[optionKey] : [];
                              const isSelected = current.includes(value);
                              return (
                                <button
                                  key={valueKey}
                                  onClick={() => {
                                    setSelectedOptions(prev => {
                                      const prevArr = Array.isArray(prev[optionKey]) ? [...prev[optionKey]] : [];
                                      const idx = prevArr.indexOf(value);
                                      if (idx === -1) prevArr.push(value); else prevArr.splice(idx, 1);
                                      return { ...prev, [optionKey]: prevArr };
                                    });
                                  }}
                                  className={`px-4 py-2.5 rounded-xl transition-all border-2 font-medium cursor-pointer transform  ${
                                    isSelected
                                      ? 'border-red-600 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                                      : `${darkMode ? 'border-gray-600 hover:border-red-400 text-gray-300 ' : 'border-gray-200 hover:border-red-300 text-gray-700'}`
                                  }`}
                                >
                                  {String(value)}
                                </button>
                              );
                            }
                            const isSelected = selectedOptions[optionKey] === value;
                            return (
                              <button
                                key={valueKey}
                                onClick={() => setSelectedOptions(prev => ({...prev, [optionKey]: value}))}
                                className={`px-4 py-2.5 rounded-xl transition-all border-2 font-medium cursor-pointer transform  ${
                                  isSelected
                                    ? 'border-red-600 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                                    : `${darkMode ? 'border-gray-600 hover:border-red-400 text-gray-300 ' : 'border-gray-200 hover:border-red-300 text-gray-700'}`
                                }`}
                              >
                                {String(value)}
                              </button>
                            );
                          })}
                  </div>
                </div>
              );
            })}

            <div className="mb-5">
              <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {t('specialInstructions')}:
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className={`w-full p-3 border-2 rounded-xl resize-none focus:border-red-400 focus:outline-none transition-colors ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'border-gray-200'
                }`}
                rows="3"
                placeholder="Any special requests?"
              />
            </div>

            <div className="mb-6">
              <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {t('quantity')}:
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 p-3 rounded-xl transition-all cursor-pointer hover:scale-110"
                >
                  <Minus className="w-5 h-5 text-gray-600" />
                </button>
                <span className={`text-2xl font-bold w-16 text-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 p-3 rounded-xl transition-all cursor-pointer hover:scale-110"
                >
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <button
              onClick={() => addToCart(selectedItem, selectedOptions, quantity, specialInstructions)}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              {t('addToCart')} — {Math.round(computedTotal)} {t('currency')}
            </button>
          </div>
        </div>
      </div>
    );
  };

const Header = () => (
  <header className={`${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-md sticky top-0 z-40`}>
    <div className="max-w-7xl mx-auto px-4">
    <div className="flex justify-between items-center h-14">
      <div 
      className="flex items-center cursor-pointer" 
      onClick={() => setCurrentPage('home')}
      >
      <div className="bg-red-600 text-white px-3 py-1 rounded-lg font-bold text-lg">
        {restaurantConfig.name}
      </div>
      </div>

      <nav className="hidden md:flex items-center space-x-6">
      {['home', 'menu', 'location'].map(page => (
        <button  id='menubutton'
        key={page}
        onClick={() => {
          if (page === 'location') {
          setCurrentPage('home');
          setTimeout(() => scrollToSection('location'), 100);
          } else {
          setCurrentPage(page);
          }
        }} 
        className={`font-medium text-sm transition-colors ${
          currentPage === page 
          ? 'text-red-600' 
          : `${darkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-700 hover:text-red-600'}`
        }`}
        >
        {t(page)}
        </button>
      ))}
      </nav>

      <div className="flex items-center space-x-3">
      <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
        {['en', 'fr', 'ar'].map(lang => (
        <button id='frbutton'
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
          language === lang ? 'bg-red-600 text-white' : 'text-gray-400'
          }`}
        >
          {lang.toUpperCase()}
        </button>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <div className="sm:hidden mr-2">
          <label htmlFor="mobile-language" className="sr-only">Select language</label>
          <div className={`relative inline-flex items-center rounded-lg px-2 py-1 shadow-sm transition-colors
               ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <select
          id="mobile-language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          aria-label="Select language"
          className={`appearance-none bg-transparent pr-6 pl-1 text-sm font-medium outline-none cursor-pointer
              ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}
            >
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="ar">AR</option>
            </select>

            {/* custom chevron */}
            <svg className={`pointer-events-none absolute right-2 w-4 h-4 transition-transform ${darkMode ? 'text-gray-200' : 'text-gray-600'}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" id='darkmodebutton'
        >
          {darkMode ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-gray-600" />}
        </button>

        <button
          onClick={() => setCurrentPage('cart')} id='cartbutton'
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">{t('cart')}</span>
          {cart.length > 0 && (
          <span className="bg-yellow-400 text-red-800 px-1.5 py-0.5 rounded-full text-xs font-bold">
            {cart.length}
          </span>
          )}
        </button>
        
        <button  id='menubutton'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-red-600 hover:cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
        </div>
          </div>
          </div>

          {mobileMenuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} border-t px-4 py-2`}>
        {['home', 'menu', 'location', 'cart'].map(page => (
        <button id='menubutton'
          key={page}
          onClick={() => {
        if (page === 'location') {
          setCurrentPage('home');
          setMobileMenuOpen(false);
          setTimeout(() => scrollToSection('location'), 100);
        } else {
          setCurrentPage(page);
          setMobileMenuOpen(false);
        }
        }} 
        className={`block w-full text-left py-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
      >
        {t(page)}
      </button>
      ))}
    </div>
    )}
   </div> 
  </header>
  );

  // Home Page Component
  const HomePage = () => (
    <div id='main' className={`${darkMode ? 'bg-gray-900' : 'bg-orange-50'} transition-colors`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920')] bg-cover bg-center mix-blend-multiply opacity-30"></div>
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeInUp">{t('name')}</h1>
          <p className="text-xl md:text-2xl text-red-100 mb-10 animate-fadeInUp animation-delay-200">{t('tagline')}</p>
          <button 
            onClick={() => setCurrentPage('menu')} 
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-red-800 font-bold py-4 px-10 rounded-full text-lg transition-all inline-flex items-center gap-2 shadow-xl hover:shadow-2xl transform hover:scale-105 cursor-pointer animate-fadeInUp animation-delay-400"
          >
            {t('orderNow')}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

       {/* Featured Section */}
      <section id='menu' className={`py-20 px-4 ${darkMode ? 'bg-gray-900' : 'bg-orange-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold sectiontitle ${darkMode ? 'text-gray-200' : 'text-gray-800 '} mb-4 `}>{t('featuredDishes')}</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('chefRecommendations')}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map(item => (
              <div 
                key={item.id} 
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer group transform hover:scale-105`}
                onClick={(e) => {
                  if (e.altKey) { removeItemFromMenu(item); return; }
                  setSelectedItem(item); setShowItemModal(true);
                }}
                {...attachLongPressHandlers(item)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {t('featured')}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-2`}>{item.name}</h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4`}>{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-red-600">{item.price} {t('currency')}</span>
                    <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-red-800 font-medium px-4 py-2 rounded-full transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-110 cursor-pointer">
                      <Plus className="w-4 h-4" />
                      {t('add')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => setCurrentPage('menu')} 
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-8 rounded-full transition-all inline-flex items-center gap-2 shadow-xl hover:shadow-2xl transform hover:scale-105 cursor-pointer"
            >
              {t('viewFullMenu')}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className={`py-20 px-4  ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-800' : 'bg-aliceblue'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold  sectiontitle ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-4`}>{t('aboutUs')}</h2> 
           
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                {t('aboutText')}
              </p>
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} p-6 rounded-2xl shadow-xl`}>
                <h3 className="text-2xl font-bold text-red-600 mb-3">{t('ourStory')}</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('storyText')}
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600" 
                alt="Restaurant Interior" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-4 bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">Since</div>
                <div className="text-5xl font-bold">2020</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    
      {/* Location Section */}
      <section id="location" className={`py-20 px-4 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-orange-50 to-red-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold sectiontitle ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-4`}>{t('location')}</h2> 
           
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-2xl shadow-xl`}>
              <h3 className="text-2xl font-bold text-red-600 mb-6">Visit Us</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <h4 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Address</h4>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{restaurantConfig.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <h4 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Hours</h4>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{restaurantConfig.hours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <h4 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Phone</h4>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{restaurantConfig.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-96 lg:h-auto rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106456.24656685!2d-7.6192!3d33.5731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca!5e0!3m2!1sen!2sma!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // Menu Page Component
  const MenuPage = () => (
    <div className={`py-12 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-orange-50 to-red-50'} min-h-screen`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-4 animate-fadeIn`}>{t('menu')}</h1>
          <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Delicious dishes made with the finest ingredients</p>
          
        </div>

  {Object.entries(menuDataState).map(([category, items]) => (
          <div key={category} className="mb-16  ">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-8 capitalize text-center sectiontitle`}>{category}</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, index) => (
                <article
                  key={item.id} 
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer group transform hover:scale-105 animate-fadeInUp`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={(e) => {
                    if (e.altKey) { removeItemFromMenu(item); return; }
                    setSelectedItem(item);
                    setShowItemModal(true);
                  }}
                  {...attachLongPressHandlers(item)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {item.featured && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          {t('featured')}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className={`font-bold text-xl ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{item.name}</h3>
                      <span className="text-xl font-bold text-red-600">{item.price} {t('currency')}</span>
                    </div>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 text-sm`}>{item.description}</p>
                    <div className="flex justify-between items-center">
                      <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-red-800 font-medium px-4 py-2 rounded-full transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-110 cursor-pointer">
                        <Plus className="w-4 h-4" />
                        {t('add')}
                      </button>
                      <small className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Tap for options</small>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Cart Page Component - moved customerDetails into local state to avoid re-rendering entire app on each keypress.
  const CartPage = React.memo(({ cart, removeFromCart, updateQuantity, getTotalPrice }) => {
    const [customerDetailsLocal, setCustomerDetailsLocal] = useState({
      name: '',
      phone: '',
      address: '',
      paymentMethod: 'cash',
    });

    const sendWhatsAppOrderLocal = () => {
      if (!customerDetailsLocal.name || !customerDetailsLocal.phone || !customerDetailsLocal.address) {
        alert('Please fill in all customer details');
        return;
      }

      let message = `🍽️ *New Order!*\n\n`;
      message += `👤 *Customer Name:* ${customerDetailsLocal.name}\n`;
      message += `📱 *Phone number:* ${customerDetailsLocal.phone}\n`;
      message += `📍 *Delivery Address:* ${customerDetailsLocal.address}\n\n`;
      message += `📋 *Order Details:*\n`;
      message += `\n`;

       cart.forEach((item, index) => {
        message += `\n${index + 1}. *${item.name}* (x${item.quantity})\n`;
        if (item.selectedOptions && Object.keys(item.selectedOptions).length > 0) {
          Object.entries(item.selectedOptions).forEach(([key, value]) => {
            message += `   • ${key}: ${value}\n`;
          });
        }
        if (item.specialInstructions) {
          message += `   📝 Special: ${item.specialInstructions}\n`;
        }
        if (item.extrasPrice && item.extrasPrice > 0) {
          message += `   ➕ Extras: ${item.extrasPrice} MAD\n`;
        }
        message += `   💰 Subtotal: ${item.subtotal} MAD\n`;
      });
      message += `\\n`;
      message += `💳 *Payment Method:* Cash on Delivery\n`;
      message += `💵 *Total Amount:* ${getTotalPrice()} MAD\n`;
      message += `\nThank you for your order! 🙏`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${restaurantConfig.whatsappNumber.replace(/[^\d]/g, '')}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    };

    // Important: removed some heavy animation classes from the form wrapper so typing won't trigger visual "refresh" effects.
    return (
      <div className={`py-12 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-orange-50 to-red-50'} min-h-screen`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-5xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-8 text-center`}>{t('yourCart')}</h1>

          {cart.length === 0 ? (
            <div className={`text-center py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl `}>
              <ShoppingCart className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{t('cartEmpty')}</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-8`}>{t('addItems')}</p>
              <button
                onClick={() => setCurrentPage('menu')}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 cursor-pointer"
              >
                {t('browseMenu')}
              </button>
            </div>
          ) : (
            <>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8 mb-8 `}>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-6`}>Order Items</h2>
                {cart.map((item, index) => (
                  <div 
                    key={item.cartId} 
                    className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} last:border-b-0 py-6 `}
                    // keep animation delay inline but avoid re-animation by not toggling class names globally on input change
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className={`font-bold text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{item.name}</h3>
                        {Object.entries(item.selectedOptions).map(([key, value]) => (
                          <p key={key} className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <span className="capitalize">{key}:</span> {value}
                          </p>
                        ))}
                        {item.specialInstructions && (
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} italic mt-1`}>
                            Special: {item.specialInstructions}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className={`${darkMode ? 'bg-gray-700 hover:bg-red-900' : 'bg-gray-100 hover:bg-red-100'} text-gray-600 hover:text-red-600 p-2 rounded-xl transition-all transform hover:scale-110 cursor-pointer`}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className={`flex items-center gap-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-1`}>
                        <button
                          onClick={() => updateQuantity(item.cartId, -1)}
                          className={`${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-100 hover:bg-gray-400'} p-2 rounded-lg transition-all cursor-pointer hover:scale-110`}
                        >
                          <Minus className="w-4 h-4 text-black dark:text-gray-300" />
                        </button>
                        <span className={`w-8 text-center font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartId, 1)}
                          className={`${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-100 hover:bg-gray-400'} p-2 rounded-lg transition-all cursor-pointer hover:scale-110`}  
                        >
                          <Plus className="w-4 h-4 text-white dark:text-gray-300" />
                        </button>
                      </div>
                      <span className="font-bold text-xl text-red-600">{item.subtotal} {t('currency')}</span>
                    </div>
                  </div>
                ))}
                <div className={`mt-8 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className={`flex justify-between text-2xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    <span>{t('total')}:</span>
                    <span className="text-red-600">{getTotalPrice()} {t('currency')}</span>
                  </div>
                </div>
              </div>

              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8 `}>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-6`}>{t('deliveryInfo')}</h2>
                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('fullName')} *</label>
                    <input
                      type="text"
                      value={customerDetailsLocal.name || ''}
                      onChange={(e) => setCustomerDetailsLocal(prev => ({...prev, name: e.target.value}))}
                      onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                      className={`w-full p-4 border-2 rounded-xl focus:border-red-400 focus:outline-none transition-colors ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'border-gray-200'
                      }`}
                      placeholder="name"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('phone')} *</label>
                    <input
                      type="tel"
                      value={customerDetailsLocal.phone}
                      onChange={(e) => setCustomerDetailsLocal(prev => ({...prev, phone: e.target.value}))}
                      onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                      className={`w-full p-4 border-2 rounded-xl focus:border-red-400 focus:outline-none transition-colors ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'border-gray-200'
                      }`}
                      placeholder="+212 6XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('deliveryAddress')} *</label>
                    <textarea
                      value={customerDetailsLocal.address}
                      onChange={(e) => setCustomerDetailsLocal(prev => ({...prev, address: e.target.value}))}
                      onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) e.preventDefault(); }}
                      className={`w-full p-4 border-2 rounded-xl resize-none focus:border-red-400 focus:outline-none transition-colors ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'border-gray-200'
                      }`}
                      rows="3"
                      placeholder="123 Main St, Casablanca"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('paymentMethod')}</label>
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-xl`}>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          checked={customerDetailsLocal.paymentMethod === 'cash'}
                          onChange={() => setCustomerDetailsLocal(prev => ({...prev, paymentMethod: 'cash'}))}
                          className="w-4 h-4 text-red-600"
                        />
                        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>{t('cashOnDelivery')}</span>
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={sendWhatsAppOrderLocal}
                  className="w-full mt-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t('placeOrder')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  });

  // Scroll-to-top floating button (adds/removes a real DOM button so no changes required to the main JSX)
  useEffect(() => {
    const isRTL = language === 'ar';
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.style.position = 'fixed';
    btn.style.zIndex = '9999';
    btn.style.bottom = '28px';
    btn.style.right = isRTL ? 'auto' : '28px';
    btn.style.left = isRTL ? '28px' : 'auto';
    btn.style.width = '48px';
    btn.style.height = '48px';
    btn.style.borderRadius = '12px';
    btn.style.border = 'none';
    btn.style.cursor = 'pointer';
    btn.style.boxShadow = '0 6px 18px rgba(0,0,0,0.18)';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.transition = 'transform 240ms ease, opacity 240ms ease';
    btn.style.transform = 'translateY(100px)';
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';
    btn.style.backdropFilter = 'blur(6px)';
    btn.style.webkitBackdropFilter = 'blur(6px)';
    btn.style.background = darkMode ? 'linear-gradient(180deg,#111827,#1f2937)' : 'linear-gradient(180deg,#fff,#f8fafc)';
    btn.style.color = darkMode ? '#f9fafb' : '#111827';

    // SVG arrow
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 15l6-6 6 6" stroke="${darkMode ? '#fde68a' : '#ef4444'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

    const scrollHandler = () => {
      const show = window.scrollY > (window.innerHeight * 0.5 || 300);
      if (show) {
        btn.style.transform = 'translateY(0)';
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
      } else {
        btn.style.transform = 'translateY(100px)';
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
      }
    };

    const onClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    window.addEventListener('scroll', scrollHandler, { passive: true });
    btn.addEventListener('click', onClick);
    // initial state
    scrollHandler();
    document.body.appendChild(btn);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      btn.removeEventListener('click', onClick);
      if (btn.parentElement) btn.parentElement.removeChild(btn);
    };
  }, [darkMode, language]);
  // Footer Component
  const Footer = () => (
    <footer id="contact" className={`${darkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-gradient-to-br from-gray-800 to-gray-900'} text-white py-16 px-4`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="animate-fadeInUp">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">{restaurantConfig.name}</h3>
            <p className="text-gray-300 mb-6">{restaurantConfig.tagline}</p>
            <div className="flex space-x-4">
              <a 
                href={restaurantConfig.social.instagram} 
                className="bg-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 p-3 rounded-xl transition-all transform hover:scale-110 cursor-pointer"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={restaurantConfig.social.facebook} 
                className="bg-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 p-3 rounded-xl transition-all transform hover:scale-110 cursor-pointer"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={restaurantConfig.social.twitter} 
                className="bg-gray-700 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-500 p-3 rounded-xl transition-all transform hover:scale-110 cursor-pointer"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="animate-fadeInUp animation-delay-200">
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">{t('contactInfo')}</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3 hover:text-red-400 transition-colors cursor-pointer">
                <MapPin className="w-5 h-5 text-red-400" />
                <span>{restaurantConfig.address}</span>
              </div>
              <div className="flex items-center gap-3 hover:text-red-400 transition-colors cursor-pointer">
                <Phone className="w-5 h-5 text-red-400" />
                <span>{restaurantConfig.phone}</span>
              </div>
              <div className="flex items-center gap-3 hover:text-red-400 transition-colors cursor-pointer">
                <Clock className="w-5 h-5 text-red-400" />
                <span>{restaurantConfig.hours}</span>
              </div>
            </div>
          </div>

          <div className="animate-fadeInUp animation-delay-400">
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">{t('quickLinks')}</h4>
            <div className="space-y-2">
              <button onClick={() => setCurrentPage('home')} className="block text-gray-300 hover:text-red-400 transition-colors cursor-pointer hover:translate-x-2 transform">
                {t('home')}
              </button>
              <button onClick={() => setCurrentPage('menu')} className="block text-gray-300 hover:text-red-400 transition-colors cursor-pointer hover:translate-x-2 transform">
                {t('menu')}
              </button>
              <button onClick={() => scrollToSection('about')} className="block text-gray-300 hover:text-red-400 transition-colors cursor-pointer hover:translate-x-2 transform">
                {t('about')}
              </button>
              <button onClick={() => scrollToSection('location')} className="block text-gray-300 hover:text-red-400 transition-colors cursor-pointer hover:translate-x-2 transform">
                {t('location')}
              </button>
              {/* Hidden admin access: invisible button */}
              <button
                onClick={() => {
                  setCurrentPage('admin');
                }}
                className="text-transparent"
                type="button"
                
              >
                admin
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">  
          <p>&copy; <span onClick={() => setCurrentPage('admin')} className='text-gray-300'>2025  </span> {restaurantConfig.name}. {t('rights')}</p>
        </div>
      </div>
    </footer>
   
  );
  

  // Admin components (login + page) — kept original behavior but ensure IDs are robust on add
  const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const SUBMIT_PASSWORD = 'admina';
    const handleLogin = (e) => { e.preventDefault(); if (password === SUBMIT_PASSWORD) { setIsAdmin(true); setAdminError(''); setCurrentPage('admin'); } else setAdminError('Invalid password'); };
    return (
      <div className={`min-h-screen flex items-center justify-center p-6 ${darkMode ? 'bg-gray-900' : ''}`}>
        <div className={`max-w-md w-full rounded-2xl p-8 ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}>
          <h2 className={`text-2xl font-extrabold mb-1 ${darkMode ? 'text-gray-100' : ''}`}>{t('adminLogin') || 'Admin Login'}</h2>
          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Secure admin access</p>
          <form onSubmit={handleLogin}>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : ''}`}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className={`w-full p-3 rounded-xl mb-4 border transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'border-gray-200'}`} placeholder={t('adminEnterPassword') || 'Enter password'} />
            {adminError && <div className="text-red-400 mb-3">{adminError}</div>}
            <div className="flex gap-3">
              <button type="submit" className="flex-1 py-3 rounded-xl bg-pink-600 text-white">Login</button>
              <button type="button" onClick={() => setCurrentPage('home')} className={`flex-1 py-3 rounded-xl border ${darkMode ? 'border-gray-600 text-gray-200' : ''}`}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const AdminPage = () => {
  const [adminTab, setAdminTab] = useState('add');
  const [editingDeleted, setEditingDeleted] = useState(null);
    const [title, setTitle] = useState('');
    const [imageData, setImageData] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('appetizers');
    const [extrasText, setExtrasText] = useState('');
    const [price, setPrice] = useState('');
    const [featured, setFeatured] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [msg, setMsg] = useState('');

    const handleImageUpload = (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => setImageData(ev.target.result);
      reader.readAsDataURL(file);
    };

    const parseExtras = (text) => {
      const extrasArr = {};
      const extrasList = [];
      if (!text) return { extrasArr, extrasList };
      // allow separators: comma, semicolon, or newline
      const parts = text.split(/[,;\n]+/).map(p => p.trim()).filter(Boolean);
      parts.forEach(p => {
        // split on the last colon so names can contain colons/spaces
        const lastColon = p.lastIndexOf(':');
        let k, v;
        if (lastColon === -1) {
          k = p.trim(); v = '0';
        } else {
          k = p.substring(0, lastColon).trim();
          v = p.substring(lastColon + 1).trim();
        }
        if (k) { extrasList.push(k); extrasArr[k] = Number(v || 0); }
      });
      return { extrasArr, extrasList };
    };

    const handleAddItem = (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      // client-side id for local fallback UI while awaiting server/db
      const newId = Date.now() + Math.floor(Math.random() * 1000000);
      const { extrasArr, extrasList } = parseExtras(extrasText);
      const options = extrasList.length > 0 ? { extras: { options: extrasList, prices: extrasArr } } : {};
      const newItem = { id: newId, name: title, description, price: Number(price) || 0, image: imageData || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600', featured: !!featured, options, category };

      (async () => {
        // First: try inserting into Supabase so the item is shared across users
        try {
          // prepare a DB-friendly object (omit client-side id so DB can generate one)
          const dbItem = { name: newItem.name, description: newItem.description, price: newItem.price, image: newItem.image, featured: newItem.featured, options: newItem.options, category: newItem.category };
          const { data, error } = await supabase.from('menu_items').insert([dbItem]).select();
          if (error) throw error;
          // use returned row to update local UI
          const inserted = (data && data[0]) ? data[0] : null;
          if (inserted) {
            setMenuDataState(prev => { const copy = { ...prev }; if (!copy[category]) copy[category] = []; copy[category] = [inserted, ...copy[category]]; try { localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(copy)); } catch (e) {} return copy; });
            setMsg('Item added');
            return;
          }
          throw new Error('no returned row');
        } catch (supErr) {
          console.warn('Supabase insert failed — falling back to localStorage only:', supErr?.message || supErr);
          // fallback: update local state and persist to localStorage
          setMenuDataState(prev => { const copy = { ...prev }; if (!copy[category]) copy[category] = []; copy[category] = [newItem, ...copy[category]]; try { localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(copy)); } catch (e) {} return copy; });
          setMsg('Item added (local only)');
        } finally {
          setTitle(''); setImageData(''); setDescription(''); setPrice(''); setExtrasText(''); setFeatured(false);
          setIsSubmitting(false);
          setTimeout(() => { setMsg(''); setCurrentPage('menu'); }, 900);
        }
      })();
    };
    

    return (
      <div className={`min-h-screen p-8 ${darkMode ? 'bg-gray-900' : ''}`}>
        <div className={`max-w-4xl mx-auto rounded-2xl p-8 ${darkMode ? 'bg-gray-800 text-gray-200' : ''}`}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-extrabold">{t('adminAddItem')}</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Add new menu items quickly</p>
            </div>
            <div>
              <button onClick={() => { setIsAdmin(false); setCurrentPage('home'); }} className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100'}`}>Logout</button>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex gap-3">
              <button onClick={() => setAdminTab('add')} className={`px-3 py-2 rounded hover:cursor-pointer ${adminTab === 'add' ? (darkMode ? 'bg-gray-700' : 'bg-gray-200') : (darkMode ? 'bg-gray-800' : 'bg-white')}`}>Add Item</button>
              <button onClick={() => setAdminTab('deleted')} className={`px-3 py-2 rounded ${adminTab === 'deleted' ? (darkMode ? 'bg-gray-700 hover:cursor-pointer' : 'bg-gray-200 hover:cursor-pointer') : (darkMode ? 'bg-gray-800' : 'bg-white')}`}>Deleted Items ({deletedItems.length})</button>
            </div>
          </div>

          <form onSubmit={handleAddItem} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : ''}`}>{t('itemTitle')}</label>
                <input value={title} onChange={e => setTitle(e.target.value)} className={`w-full p-3 rounded-xl border transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'border-gray-200'}`} required />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : ''}`}>{t('imageUpload')}</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className={`w-full text-sm ${darkMode ? 'text-gray-200' : ''}`} />
                {imageData && <img src={imageData} alt="preview" className="mt-3 w-32 h-32 object-cover rounded-lg" />}
              </div>

              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : ''}`}>{t('itemDescription')}</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className={`w-full p-3 rounded-xl border transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'border-gray-200'}`} />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : ''}`}>{t('itemCategory')}</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className={`w-full p-3 rounded-xl border transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'border-gray-200'}`}>
                  <option value="appetizers">appetizers</option>
                  <option value="mains">mains</option>
                  <option value="desserts">desserts</option>
                  <option value="beverages">beverages</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : ''}`}>{t('itemPrice')}</label>
                <input value={price} onChange={e => setPrice(e.target.value)} type="number" className={`w-full p-3 rounded-xl border transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'border-gray-200'}`} />
              </div>

              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : ''}`}>{t('itemExtras')}</label>
                <input value={extrasText} onChange={e => setExtrasText(e.target.value)} placeholder="Extra Cheese:15,Extra Basil:10" className={`w-full p-3 rounded-xl border transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'border-gray-200'}`} />
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Provide extras as comma separated key:price pairs.</p>
              </div>

              <div className="flex items-center gap-3">
                <label className={`flex items-center gap-2 cursor-pointer select-none ${darkMode ? 'text-gray-200' : ''}`}>
                  <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} className="w-4 h-4" />
                  <span>{t('itemFeatured')}</span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button type="submit" disabled={isSubmitting} className="px-6 py-3 rounded-xl bg-indigo-500 text-white">{t('adminSubmit')}</button>
              {msg && <span className="text-green-500 font-medium">{msg}</span>}
              <div className={`ml-auto text-sm ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>{isSubmitting ? 'Saving...' : ''}</div>
            </div>
          </form>
          {adminTab === 'deleted' && (
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-3">Deleted Items</h3>
              {deletedItems.length === 0 ? (
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No deleted items</p>
              ) : (
                <div className="space-y-4">
                  {deletedItems.map((d) => (
                    <div key={d.id} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex justify-between items-center`}>
                      <div>
                        <div className={`font-bold ${darkMode ? 'text-gray-100' : ''}`}>{d.name}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{d.description}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setEditingDeleted(d)} className={`px-3 py-2 rounded border ${darkMode ? 'border-gray-600 text-gray-200' : ''}`}>Edit</button>
                        <button onClick={() => {
                          // publish back to chosen category (default to appetizers)
                          const publishTo = 'appetizers';
                          const restored = { ...d }; delete restored.deletedAt;
                          setMenuDataState(prev => { const copy = { ...prev }; if (!copy[publishTo]) copy[publishTo] = []; copy[publishTo] = [restored, ...copy[publishTo]]; try { localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(copy)); } catch (e) {} return copy; });
                          setDeletedItems(prev => prev.filter(x => x.id !== d.id));
                        }} className="px-3 py-2 rounded bg-green-600 text-white">Publish</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {editingDeleted && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/40" onClick={() => setEditingDeleted(null)} />
              <div className={`relative ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white'} rounded-2xl p-6 max-w-2xl w-full shadow-2xl`}> 
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-gray-100' : ''}`}>Edit Deleted Item</h3>
                <div className="space-y-3">
                  <input value={editingDeleted.name} onChange={(e) => setEditingDeleted(prev => ({...prev, name: e.target.value}))} className={`w-full p-3 rounded-xl border transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'border-gray-200'}`} />
                  <input value={editingDeleted.price} onChange={(e) => setEditingDeleted(prev => ({...prev, price: Number(e.target.value) || 0}))} type="number" className={`w-48 p-3 rounded-xl border transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'border-gray-200'}`} />
                  <textarea value={editingDeleted.description} onChange={(e) => setEditingDeleted(prev => ({...prev, description: e.target.value}))} className={`w-full p-3 rounded-xl border transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'border-gray-200'}`} rows={3} />
                  <div className="flex justify-end gap-3">
                    <button onClick={() => setEditingDeleted(null)} className={`px-3 py-2 rounded border ${darkMode ? 'border-gray-600 text-gray-200' : ''}`}>Cancel</button>
                    <button onClick={() => {
                      // save edits back into deletedItems
                      setDeletedItems(prev => prev.map(d => d.id === editingDeleted.id ? editingDeleted : d));
                      setEditingDeleted(null);
                    }} className="px-3 py-2 rounded bg-indigo-600 text-white">Save</button>
                    <button onClick={() => {
                      // publish immediately
                      const restored = { ...editingDeleted }; delete restored.deletedAt;
                      const publishTo = 'appetizers';
                      setMenuDataState(prev => { const copy = { ...prev }; if (!copy[publishTo]) copy[publishTo] = []; copy[publishTo] = [restored, ...copy[publishTo]]; try { localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(copy)); } catch (e) {} return copy; });
                      setDeletedItems(prev => prev.filter(x => x.id !== editingDeleted.id));
                      setEditingDeleted(null);
                    }} className="px-3 py-2 rounded bg-green-600 text-white">Publish</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-orange-50'} transition-colors`}>
      <style jsx>{`
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes fadeInUp {
        from { 
        opacity: 0;
        transform: translateY(20px);
        }
        to { 
        opacity: 1;
        transform: translateY(0);
        }
      }
      
      @keyframes slideUp {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
      
      @keyframes slideDown {
        from { 
        opacity: 0;
        transform: translateY(-10px);
        }
        to { 
        opacity: 1;
        transform: translateY(0);
        }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out;
      }
      
      .animate-fadeInUp {
        animation: fadeInUp 0.6s ease-out;
        animation-fill-mode: both;
      }
      
      .animate-slideUp {
        animation: slideUp 0.3s ease-out;
      }
      
      .animate-slideDown {
        animation: slideDown 0.3s ease-out;
      }
      
      .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: .5; }
      }
      
      .animation-delay-200 {
        animation-delay: 200ms;
      }
      
      .animation-delay-400 {
        animation-delay: 400ms;
      }
      `}</style>
      <Header />
      <main>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'menu' && <MenuPage />}
      {currentPage === 'cart' && <CartPage cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} getTotalPrice={getTotalPrice} />}
       {currentPage === "admin" && (isAdmin ? <AdminPage /> : <AdminLogin />)}

      </main>
      <Footer />
      {showItemModal && <ItemModal />}
      {/* In-app confirmation modal for destructive actions */}
      {pendingDeleteItem && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40" onClick={cancelPendingDelete} />
        <div className={`relative ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 max-w-md w-full shadow-2xl`}>
        <h3 className="text-xl font-bold mb-3">Confirm removal</h3>
        <p className="mb-6">Are you sure you want to remove <strong>{pendingDeleteItem.name}</strong> from the menu? This action can be undone by re-adding the item in Admin.</p>
        <div className="flex gap-3 justify-end">
          <button onClick={cancelPendingDelete} className="px-4 py-2 rounded-xl border">Cancel</button>
          <button onClick={() => performRemove(pendingDeleteItem)} className="px-4 py-2 rounded-xl bg-red-600 text-white">Remove</button>
        </div>
        </div>
      </div>
      )}
      {/* Undo snackbar for soft-deletes - placed on the left side */}
      {undoSnackbar.visible && (
      <div className="fixed bottom-10 z-50 left-4" style={{ left: '1rem', right: 'auto' }}>
        <div
        role="status"
        aria-live="polite"
        className={`px-4 py-3 rounded-xl shadow-lg flex items-center gap-4 transition-transform transform ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
        >
        <div className="font-medium bottom-15">Item removed  <button onClick={undoDeletion} className={`underline ${darkMode ? 'text-yellow-300' : 'text-orange-600'}`}>Undo</button></div>
         
        </div>
      </div>
      )}
    </div>
    );
};

export default RestaurantWebsite;
// current bugs : Items added from admin panel are stored in admin local storage only (needs a database) {
 // }
// new option like size and engriedients are going to be added
//extras has to display their price
// make whatsapp message in darija