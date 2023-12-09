export const selectOrderData = (data) =>
  data.map(
    ({
      id,
      totalPrice,
      orderNumber,
      statusCode,
      status,
      items,
      createdAt,
      chef,
      isPaid,
    }) => ({
      id,
      orderNumber,
      statusCode,
      status,
      items: selectOrderItems(items),
      createdAt,
      isPaid,
      totalPrice,
      chef: {
        id: chef.id,
        fullName: `${chef.user.firstName} ${chef.user.lastName}`,
      },
    })
  );

export const selectOrderItems = (items) =>
  items.map(({ count, dish }) => ({ dish, count }));
