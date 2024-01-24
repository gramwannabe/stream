export async function healthcheckHandler(req, res) {
    try {
        return res.code(200).send({ status_code: 200, app: true});
    } catch (error) {
        console.error(error);
        return res.code(500).send({ status_code: 500, app: false, message: error.message });
    }
}