import twint

# Configure
c = twint.Config()
c.Search = "crypto,cryptocurrency"
c.Custom["tweet"] = ["created_at", "tweet"]
c.Store_json = True
c.Output = "../src/tweets.txt"

# Run
twint.run.Search(c)
