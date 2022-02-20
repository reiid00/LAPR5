namespace _21s5_df_32_proj.Domain.Shared
{
    /// <summary>
    /// Base class for entities.
    /// </summary>
    public abstract class Entity<TEntityId>
    where TEntityId: EntityId
    {
         public TEntityId Id { get;  protected set; }
    }
}