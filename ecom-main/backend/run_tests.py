import unittest
from tests.test_auth import AuthTest
from tests.test_ideals import TestIdeals

if __name__ == '__main__':
    # Create a test suite
    suite = unittest.TestLoader().loadTestsFromTestCase(AuthTest)
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(TestIdeals))
    # Run the test suite
    unittest.TextTestRunner(verbosity=2).run(suite) 