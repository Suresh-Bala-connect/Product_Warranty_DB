const sendMail = require("../Model/EmailSchema");

const sendMailController = async (req, res) => {
    try {
        const { userEmail, products } = req.body;

        console.log(req.body);

        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + 7);

        const emailText = `Dear Customer,
        This is a reminder that the warranty for ${item.productName}
        (Product ID: ${item._id})
         will expire on ${item.warrantyDate}.
        Please contact us if you have any questions or need further assistance.
        Thank you for choosing our products!
        Best regards,
        Suresh Bala Connect`;

        await sendMail(
            userEmail,
            "Warranty Expiry Reminder",
            emailText
        );
        //     }
        // }

        res.status(200).json({ message: "Email check completed" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { sendMailController };
