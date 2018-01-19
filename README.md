# Connector
Generic connector for sync or async communication between ECM and BPM

# Feature
    1. Provides communication between ECM and BPM

    2. Can process communication in Async or Sync way

    3. Independent of Source and Destination services

    4. Standalone deployable solution

In order to communicate BPM to ECM or vice versa a channel needs to be created.
A channel consists of list of steps which contains information regarding communication. Each step signifies one communication.
    
## Channel
    Identified by an Identifier (Unique through out the system)

    Contains Series of Processes or Steps

    Each Process contains details about source and destination

        Detail incudes 
        Source’s End point
        Output format
        Destination’s endpoint
        Input format
        Logic to map Source’s Output format to Destination’s Input format
