'use client';

import { services } from '@/services';
import { Avatar, Button, Screen, Table, Tabs, User } from '@/ui';
import { addToast } from '@heroui/react';
import { useEffect, useState } from 'react';

export default function Page() {
  //const [products, setProducts] = useState([]);
  //const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  //const [isLoading, setIsLoading] = useState(false);
  //const [cart, setCart] = useState([]);
  //
  //const get = async ({ search = '', page = 1 } = {}) => {
  //  const response = await services.products.index({ params: { limit: 10, search, page } });
  //  if (response?.data) setProducts(response?.data);
  //};
  //
  //const addToCart = async ({ quantity, product_id }) => {
  //  const me = await services.auth.me();
  //
  //  if (me?.data?.employee?.id) {
  //    const response = await services.carts.store({ quantity, product_id, employee_id: me?.data?.employee?.id });
  //    if (response?.status == 'error') addToast({ title: 'Error', description: response?.message, color: 'danger' });
  //    if (response?.status == 'success') addToast({ title: 'Success', description: response?.message, color: 'success' });
  //  }
  //
  //  await getCart();
  //};
  //
  //const getCart = async () => {
  //  const me = await services.auth.me();
  //
  //  if (me?.data?.employee?.id) {
  //    const response = await services.carts.index({ params: { employee_id: me?.data?.employee?.id } });
  //    if (response?.data) setCart(response?.data);
  //  }
  //};
  //
  //const createOrder = async () => {
  //  const me = await services.auth.me();
  //
  //  if (me?.data?.employee?.id) {
  //    const response = await services.orders.store({ employee_id: me?.data?.employee?.id });
  //    if (response?.status == 'error') addToast({ title: 'Error', description: response?.message, color: 'danger' });
  //    if (response?.status == 'success') addToast({ title: 'Success', description: response?.message, color: 'success' });
  //  }
  //
  //  await getCart();
  //};
  //
  //useEffect(() => {
  //  get();
  //  getCart();
  //}, []);

  return;

  //return (
  //  <Screen>
  //    <Tabs headers={['Tienda', 'Carrito']}>
  //      <Table
  //        title="Tienda"
  //        headers={['Imagen', 'Nombre', 'Sku', 'Set', 'Description', 'Acciones']}
  //        page={pagination?.page}
  //        pages={pagination?.pages}
  //        isLoading={isLoading}
  //        onSearch={(search) => get({ search })}
  //        onChange={(page) => get({ page })}
  //      >
  //        {products.map((product, index) => {
  //          return [
  //            <div key={index}>
  //              <Avatar src={product?.image} />
  //            </div>,
  //            <div key={index}>{product?.name}</div>,
  //            <div key={index}>{product?.sku}</div>,
  //            <div key={index}>{product?.set}</div>,
  //            <div key={index}>{product?.description}</div>,
  //            <div key={index} className="flex gap-2 justify-center items-center">
  //              <Button onPress={() => addToCart({ quantity: 1, product_id: product?.id })} size="sm">
  //                +1
  //              </Button>
  //              <Button onPress={() => addToCart({ quantity: product?.set, product_id: product?.id })} size="sm">
  //                +{product?.set}
  //              </Button>
  //            </div>,
  //          ];
  //        })}
  //      </Table>
  //
  //      <div className=" flex flex-col gap-2">
  //        <Button onPress={createOrder} className="w-full">
  //          Ordenar
  //        </Button>
  //
  //        <Table
  //          title="Carrito"
  //          headers={['Imagen', 'Nombre', 'Sku', 'Set', 'Description', 'Acciones', 'Total']}
  //          page={pagination?.page}
  //          pages={pagination?.pages}
  //          isLoading={isLoading}
  //          onSearch={(search) => get({ search })}
  //          onChange={(page) => get({ page })}
  //        >
  //          {cart.map((product, index) => {
  //            return [
  //              <div key={index}>
  //                <Avatar src={product?.image} />
  //              </div>,
  //              <div key={index}>{product?.product?.name}</div>,
  //              <div key={index}>{product?.product?.sku}</div>,
  //              <div key={index}>{product?.product?.set}</div>,
  //              <div key={index}>{product?.product?.description}</div>,
  //              <div key={index} className="flex gap-2 justify-center items-center">
  //                <Button onPress={() => addToCart({ quantity: -product?.product?.set, product_id: product?.product?.id })} size="sm" color="danger">
  //                  -{product?.product?.set}
  //                </Button>
  //
  //                <Button onPress={() => addToCart({ quantity: -1, product_id: product?.product?.id })} size="sm" color="danger">
  //                  -1
  //                </Button>
  //
  //                <Button onPress={() => addToCart({ quantity: 1, product_id: product?.product?.id })} size="sm" color="primary">
  //                  +1
  //                </Button>
  //                <Button onPress={() => addToCart({ quantity: product?.product?.set, product_id: product?.product?.id })} size="sm" color="primary">
  //                  +{product?.product?.set}
  //                </Button>
  //              </div>,
  //
  //              <div>{product?.quantity}</div>,
  //            ];
  //          })}
  //        </Table>
  //      </div>
  //    </Tabs>
  //  </Screen>
  //);
}
