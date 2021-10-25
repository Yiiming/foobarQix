import graphene
import stepOne.schema

class Query(stepOne.schema.Query, graphene.ObjectType):
    """
    Projects main Query class, this will inherit multiple queries.
    """
    pass
schema = graphene.Schema(query=Query)

class Mutation(stepOne.schema.Mutation, graphene.ObjectType):
    """
    Projects main Mutation class, this will 
    inherit multiple mutations.
    """
    pass
schema = graphene.Schema(query=Query, mutation=Mutation)