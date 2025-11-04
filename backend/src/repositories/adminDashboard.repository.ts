import { supabase } from '@config/supabase';
import { MostSoldProduct, DailySalesData } from '@backendTypes/adminDashboard.types';

export const adminDashboardRepository = {
  async getMostSoldProducts(limit: number = 5): Promise<MostSoldProduct[]> {
    const { data: detalleData, error: detalleError } = await supabase
      .from('detallepedido')
      .select(`
        idproducto,
        cantidad
      `);

    if (detalleError) {
      console.error('Supabase error fetching detallepedido for most sold products:', detalleError);
      throw new Error('Could not fetch order details for most sold products');
    }

 
    const aggregatedSales = detalleData.reduce((acc: { [key: number]: number }, item) => {
      acc[item.idproducto] = (acc[item.idproducto] || 0) + item.cantidad;
      return acc;
    }, {});


    const sortedProductSales = Object.entries(aggregatedSales)
      .sort(([, countA], [, countB]) => (countB as number) - (countA as number))
      .slice(0, limit);


    const topProductIds = sortedProductSales.map(([id]) => parseInt(id));

    if (topProductIds.length === 0) {
      return [];
    }

    const { data: productsData, error: productsError } = await supabase
      .from('producto')
      .select(`
        idproducto,
        nombre,
        categoria_id,
        categorias(nombre)
      `)
      .in('idproducto', topProductIds);

    if (productsError) {
      console.error('Supabase error fetching product details for most sold products:', productsError);
      throw new Error('Could not fetch product details for most sold products');
    }


    const totalSalesAmount = Object.values(aggregatedSales).reduce((sum, count) => sum + (count as number), 0);


    const result: MostSoldProduct[] = sortedProductSales.map(([id, salesAmount]) => {
      const product = productsData.find(p => p.idproducto === parseInt(id));
      const categoryName = product?.categorias && product.categorias.length > 0 ? (product.categorias[0] as { nombre: string }).nombre : 'Unknown';
      return {
        id: product?.idproducto.toString() || '',
        name: product?.nombre || 'Unknown',
        category: categoryName,
        salesAmount: salesAmount as number,
        percentage: totalSalesAmount > 0 ? parseFloat(((salesAmount as number / totalSalesAmount) * 100).toFixed(2)) : 0,
      };
    });

    return result;
  },

  async getWeeklySalesSummary(): Promise<DailySalesData[]> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoISO = sevenDaysAgo.toISOString().split('T')[0];

    const { data: pedidosData, error: pedidosError } = await supabase
      .from('pedido')
      .select('fecha, total')
      .gte('fecha', sevenDaysAgoISO)
      .order('fecha', { ascending: true });

    if (pedidosError) {
      console.error('Supabase error fetching pedidos for weekly summary:', pedidosError);
      throw new Error('Could not fetch orders for weekly summary');
    }

    const dailySalesMap: { [key: string]: number } = {};
    pedidosData.forEach(pedido => {
      const day = pedido.fecha;
      dailySalesMap[day] = (dailySalesMap[day] || 0) + pedido.total;
    });

    const result: DailySalesData[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dayString = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });
      result.push({
        day: dayName.charAt(0).toUpperCase() + dayName.slice(1).replace('.', ''),
        earnings: dailySalesMap[dayString] || 0,
      });
    }

    return result;
  },

  async getSalesToday(): Promise<number> {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('pedido')
      .select('total')
      .eq('fecha', today)
      .eq('estado', 'entregado');

    if (error) {
      console.error('Supabase error fetching sales today:', error);
      throw new Error('Could not fetch sales today');
    }
    return data.reduce((sum, order) => sum + (order.total || 0), 0);
  },

  async getOrdersToday(): Promise<number> {
    const today = new Date().toISOString().split('T')[0];
    const { count, error } = await supabase
      .from('pedido')
      .select('*', { count: 'exact', head: true })
      .eq('fecha', today);

    if (error) {
      console.error('Supabase error fetching orders today:', error);
      throw new Error('Could not fetch orders today');
    }
    return count || 0;
  },

  async getAverageTicket(): Promise<number> {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('pedido')
      .select('total')
      .eq('fecha', today)
      .eq('estado', 'entregado');

    if (error) {
      console.error('Supabase error fetching average ticket:', error);
      throw new Error('Could not fetch average ticket');
    }

    if (data.length === 0) {
      return 0;
    }
    const totalSales = data.reduce((sum, order) => sum + (order.total || 0), 0);
    return parseFloat((totalSales / data.length).toFixed(2));
  },

  async getCancellationRate(): Promise<number> {
    const { count: totalOrdersCount, error: totalError } = await supabase
      .from('pedido')
      .select('*', { count: 'exact', head: true });

    if (totalError) {
      console.error('Supabase error fetching total orders for cancellation rate:', totalError);
      throw new Error('Could not fetch total orders for cancellation rate');
    }

    const { count: cancelledOrdersCount, error: cancelledError } = await supabase
      .from('pedido')
      .select('*', { count: 'exact', head: true })
      .eq('estado', 'cancelado');

    if (cancelledError) {
      console.error('Supabase error fetching cancelled orders for cancellation rate:', cancelledError);
      throw new Error('Could not fetch cancelled orders for cancellation rate');
    }

    if (totalOrdersCount === 0) {
      return 0;
    }

    return parseFloat(((cancelledOrdersCount || 0) / (totalOrdersCount || 0) * 100).toFixed(2));
  },

  async getSalesYesterday(): Promise<number> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayISO = yesterday.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('pedido')
      .select('total')
      .eq('fecha', yesterdayISO)
      .eq('estado', 'entregado');

    if (error) {
      console.error('Supabase error fetching sales yesterday:', error);
      throw new Error('Could not fetch sales yesterday');
    }
    return data.reduce((sum, order) => sum + (order.total || 0), 0);
  },

  async getOrdersYesterday(): Promise<number> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayISO = yesterday.toISOString().split('T')[0];

    const { count, error } = await supabase
      .from('pedido')
      .select('*', { count: 'exact', head: true })
      .eq('fecha', yesterdayISO);

    if (error) {
      console.error('Supabase error fetching orders yesterday:', error);
      throw new Error('Could not fetch orders yesterday');
    }
    return count || 0;
  },

  async getAverageTicketYesterday(): Promise<number> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayISO = yesterday.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('pedido')
      .select('total')
      .eq('fecha', yesterdayISO)
      .eq('estado', 'entregado');

    if (error) {
      console.error('Supabase error fetching average ticket yesterday:', error);
      throw new Error('Could not fetch average ticket yesterday');
    }

    if (data.length === 0) {
      return 0;
    }
    const totalSales = data.reduce((sum, order) => sum + (order.total || 0), 0);
    return parseFloat((totalSales / data.length).toFixed(2));
  },
};
