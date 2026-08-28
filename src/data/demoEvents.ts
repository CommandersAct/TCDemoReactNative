/**
 * Prebuilt sample events for the "Send events" screen's dropdown. Each entry
 * builds a ready-to-execute TCEvent instance so the demo works without any
 * input forms — pick one from the dropdown, tap Execute.
 */
import {
  TCEvent,
  TCPageViewEvent,
  TCLoginEvent,
  TCSignUpEvent,
  TCSearchEvent,
  TCAddToCartEvent,
  TCBeginCheckoutEvent,
  TCPurchaseEvent,
  TCRefundEvent,
  TCCustomEvent,
  TCItem,
  TCProduct,
} from '@commandersact/tcserverside-react-native';

function sampleItems(): TCItem[] {
  const product = Object.assign(new TCProduct(), {
    ID: 'demo_product_1',
    name: 'Demo product',
    price: 19.9,
    currency: 'EUR',
    categories: ['demo_category'],
    brand: 'Demo brand',
  });
  const item = Object.assign(new TCItem(), {
    ID: 'demo_item_1',
    quantity: 2,
    product,
  });
  return [item];
}

export type DemoEvent = {
  label: string;
  build: () => TCEvent;
};

export const DEMO_EVENTS: DemoEvent[] = [
  {
    label: 'Page view',
    build: () => Object.assign(new TCPageViewEvent('view_page'), { pageName: 'home' }),
  },
  {
    label: 'Login',
    build: () => Object.assign(new TCLoginEvent(), { method: 'email' }),
  },
  {
    label: 'Sign up',
    build: () => Object.assign(new TCSignUpEvent(), { method: 'email' }),
  },
  {
    label: 'Search',
    build: () => new TCSearchEvent('demo search term'),
  },
  {
    label: 'Add to cart',
    build: () => new TCAddToCartEvent(sampleItems(), 19.9, 'EUR'),
  },
  {
    label: 'Begin checkout',
    build: () =>
      Object.assign(new TCBeginCheckoutEvent(), {
        value: 19.9,
        currency: 'EUR',
        items: sampleItems(),
      }),
  },
  {
    label: 'Purchase',
    build: () =>
      new TCPurchaseEvent('demo_order_1', 19.9, 19.9, 'EUR', 'purchase', 'CreditCard', 'completed', sampleItems()),
  },
  {
    label: 'Refund',
    build: () => new TCRefundEvent('demo_order_1', '19.9', '19.9', 'EUR', 'refund', sampleItems()),
  },
  {
    label: 'Custom event',
    build: () => {
      const event = new TCCustomEvent('demo_custom_event');
      event.addAdditionalProperty('demo_property', 'demo_value');
      return event;
    },
  },
];
