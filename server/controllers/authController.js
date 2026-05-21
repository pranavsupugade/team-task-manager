exports.signup = async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    res.status(201).json({
      message: "Signup successful",
      user: {
        name,
        email,
        role
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

exports.login = async (req, res) => {

  try {

    const { email } = req.body;

    res.json({
      message: "Login successful",
      token: "sample_token_123",
      user: {
        email
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};