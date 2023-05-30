import Link from "next/link";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../../firebaseConfig";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

export default function Routes() {
  const db = getDatabase(app);

  const [routes, setRoutes] = useState({});
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setSelectedCard(id);
  };

  const handleCardHover = (id: string) => {
    setHoveredCard(id);
  };
  useEffect(() => {
    get(ref(db, "routes"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setRoutes(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Routes
        </h1>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(routes).map(([id, val]) => {
          const rte = val as IRoute;
          return (
            <Link key={id} href={`/routes/${id}`} passHref>
              <Card
                className={`p-4 flex flex-col mb-2 justify-between rounded-lg shadow ${
                  hoveredCard === id
                    ? "bg-gray-100 scale-105"
                    : hoveredCard === id
                    ? "bg-blue-200"
                    : "bg-white"
                }`}
                onMouseEnter={() => handleCardHover(id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(id)}
              >
                <Card.Body>
                  <Card.Title className="text-lg font-semibold leading-6 text-gray-900">
                    {rte.name}
                  </Card.Title>
                  <Card.Text className="mt-1 text-sm leading-5 text-gray-500">
                    {rte.desc}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
