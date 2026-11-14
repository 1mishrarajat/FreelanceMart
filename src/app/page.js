import BenefitsBar from "./Benefits/Benefits";
import ShopByCategory from "./Category/ShopByCategory";
import CustomerReviews from "./Customer-reviews/CustomerReviews";
import DealsSection from "./DealsSection/dealsSection";
import Featured from "./Featured-product/Featured";
import Hero from "./hero/hero";
import TopBrands from "./Top-brands/TopBrands";


export default function Home() {
  return (
    <>  
  
      <main>
      <Hero />
      <BenefitsBar />
      <ShopByCategory />
      <Featured />
      <TopBrands />
      <DealsSection />
      <CustomerReviews />

      </main>
    </>
  );
}