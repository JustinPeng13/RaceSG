"use client";

import { useState } from "react";
import Link from "next/link";

const flavours = ["Vanilla", "Chocolate", "Strawberry"] as const;
type IceCream = (typeof flavours)[number];

const LoginWithIceCream = () => {
  const [state, setState] = useState<IceCream>("Vanilla");

  return (
    <div>
        <h2>Favourite ice cream flavour</h2>
        <div>
          {flavours.map((flavour) => (
            <div
              key={flavour}
              onClick={() => setState(flavour)}
            >
              <input
                type="radio"
                checked={state === flavour}
                value={flavour}
                onChange={(e) => setState(e.target.value as IceCream)}
                title="flavour"
              />
              {flavour}
            </div>
          ))}
        </div>

        <Link
          prefetch={false}
          href={`/login?state=${state}`}
        >
          <button>
            Login with Singpass app
          </button>
        </Link>
      </div>
  );
};

export default LoginWithIceCream;

