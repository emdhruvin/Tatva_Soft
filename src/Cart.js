import { useState, useEffect } from "react";
import appStyle from "./AppStyle.module.css";
import axios from "axios";
import { useAuth } from "./AuthContext";
import SingleBook from "./SingleBook";

function Cart() {
  const [addedBook, setAddedBook] = useState([]);
  const CART_END_POINT = "api/cart?userId=";
  const CART_DELTE_END_POINT = "api/cart?id=";
  const CART_UPDATE_END_POINT = "api/cart";
  const { user } = useAuth();

  const handleDelete = async (itemId) => {
    // console.log(itemId);
    let arr = [...addedBook];

    // console.log(idx);
    await axios
      .delete(
        `https://book-e-sell-node-api.vercel.app/${CART_DELTE_END_POINT}${itemId}`
      )
      .then((res) => {
        if (res.status === 200) {
          const idx = addedBook.findIndex((e) => e.id === itemId);
          arr.splice(idx, 1);
          setAddedBook(arr);
          console.log("entry deleted");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = async (id, bookId, quantity, sw) => {
    let arr = [...addedBook];
    const userId = user.id;
    let requestedData = {};
    // console.log(requestedData);

    switch (sw) {
      case "inc":
        requestedData = {
          id: id,
          bookId: bookId,
          userId: userId,
          quantity: quantity + 1,
        };
        await axios
          .put(
            `https://book-e-sell-node-api.vercel.app/${CART_UPDATE_END_POINT}`,
            requestedData
          )
          .then((res) => {
            if (res.status === 200) {
              const idx = addedBook.findIndex((e) => e.id === id);
              arr[idx].quantity = quantity + 1;
              setAddedBook(arr);
            }
          })
          .catch((err) => console.log(err));
        break;
      case "dec":
        requestedData = {
          id: id,
          bookId: bookId,
          userId: userId,
          quantity: quantity - 1,
        };
        await axios
          .put(
            `https://book-e-sell-node-api.vercel.app/${CART_UPDATE_END_POINT}`,
            requestedData
          )
          .then((res) => {
            if (res.status === 200) {
              const idx = addedBook.findIndex((e) => e.id === id);
              arr[idx].quantity = quantity - 1;
              setAddedBook(arr);
            }
          })
          .catch((err) => console.log(err));
        break;
    }
  };

  const getData = async () => {
    const userId = user.id;
    await axios
      .get(`https://book-e-sell-node-api.vercel.app/${CART_END_POINT}${userId}`)
      .then((res) => {
        if (res.status === 200) {
          setAddedBook(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(addedBook);

  return (
    <div className={appStyle.containerDiv}>
      <h2 className={appStyle.heading}>Cart</h2>
      {addedBook.length > 0 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            flexFlow: "column",
          }}
        >
          {addedBook.map((book, i) => (
            <div
              key={i}
              style={{
                width: "80%",
                padding: "1rem",
                backgroundColor: "#fff",
                borderRadius: ".5rem",
              }}
            >
              <SingleBook
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                index={i}
                data={book}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          {" "}
          <p>Cart is Empty</p>
        </div>
      )}
    </div>
  );
}
export default Cart;
