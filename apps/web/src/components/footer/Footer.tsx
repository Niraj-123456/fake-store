import React from "react";
import { Button } from "ui/components/ui/button";
import { Input } from "ui/components/ui/input";

const Footer = () => {
  return (
    <div className="mt-12 px-44 pt-24 pb-2 divide-y-2 border-t-2 border-gray-100 bg-gray-50">
      <div className="flex justify-between">
        <div>Logo</div>
        <section aria-label="Products">
          <h4 className="font-semibold">Products</h4>
          <ul className="text-sm text-gray-600 pt-3 flex flex-col gap-2">
            <li>Bags</li>
            <li>Tees</li>
            <li>Caps</li>
            <li>T-shirts</li>
          </ul>
        </section>
        <section aria-label="Company">
          <h4 className="font-semibold">Company</h4>
          <ul className="text-sm text-gray-600 pt-3 flex flex-col gap-2">
            <li>Who we are</li>
            <li>Contacts</li>
            <li>Careers</li>
            <li>Terms & Conditions</li>
            <li>Privacy</li>
          </ul>
        </section>
        <section aria-label="Customer Service">
          <h4 className="font-semibold">Customer Service</h4>
          <ul className="text-sm text-gray-600 pt-3 flex flex-col gap-2">
            <li>Bags</li>
            <li>Tees</li>
            <li>Caps</li>
            <li>T-shirts</li>
          </ul>
        </section>
        <section aria-label="newsleter signup">
          <h4 className="font-semibold">Sign up for our newsletter</h4>
          <p className="text-sm text-gray-500 py-2">
            The latest deals and savings, sent to your inbox weekly.
          </p>
          <div className="flex gap-2 mt-2">
            <Input />
            <Button>Sign up</Button>
          </div>
        </section>
      </div>
      <div className="mt-8 text-center text-gray-600 p-4">
        &copy; {new Date().getFullYear()} Fake Store, Inc. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
