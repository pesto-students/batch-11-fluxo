import {router} from "../constants/packageConfig";
import {userRegister, userLogin, userLogout} from "../constants/userConfig";

router.post("/register", userRegister);

router.post("/login", userLogin);

router.get("/logout", userLogout);

module.exports = router;
