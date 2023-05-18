import Button from "../../components/button";
import classes from "./home.module.css";

function HomePage() {
  return (
    <div className={classes.body}>
      <div>
        <h1 className={classes.heading}>E-Coupon System</h1>
      </div>
      <div className={classes.container}>
        <div className={classes.square}>
          <div className={classes.box}>
            <nav>
              <ul className={classes.buttonlist}>
                <li>
                  <Button text="Student" page="/student/login" />

                  <Button text="Vendor" page="/vendor/login" />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
