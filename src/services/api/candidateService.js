const tableName = 'candidate_c';

export const candidateService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "currentJobTitle_c" } },
          { field: { Name: "position_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "appliedAt_c" } },
          { field: { Name: "experienceLevel_c" } },
          { field: { Name: "skills_c" } },
          { field: { Name: "resumeSummary_c" } },
          { field: { Name: "availability_c" } }
        ],
        orderBy: [
          { fieldName: "appliedAt_c", sorttype: "DESC" }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching candidates:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "currentJobTitle_c" } },
          { field: { Name: "position_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "appliedAt_c" } },
          { field: { Name: "experienceLevel_c" } },
          { field: { Name: "skills_c" } },
          { field: { Name: "resumeSummary_c" } },
          { field: { Name: "availability_c" } }
        ]
      };

      const response = await apperClient.getRecordById(tableName, parseInt(id), params);
      
      if (!response || !response.data) {
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching candidate with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(candidateData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [
          {
            Name: candidateData.Name || candidateData.name || 'Unnamed Candidate',
            Tags: candidateData.Tags || '',
            email_c: candidateData.email_c || candidateData.email,
            phone_c: candidateData.phone_c || candidateData.phone,
            location_c: candidateData.location_c || candidateData.location,
            currentJobTitle_c: candidateData.currentJobTitle_c || candidateData.currentJobTitle,
            position_c: candidateData.position_c || candidateData.position,
            status_c: candidateData.status_c || candidateData.status || 'new',
            appliedAt_c: candidateData.appliedAt_c || new Date().toISOString(),
            experienceLevel_c: candidateData.experienceLevel_c || candidateData.experienceLevel || 'entry',
            skills_c: Array.isArray(candidateData.skills_c) ? candidateData.skills_c.join(',') : 
                     Array.isArray(candidateData.skills) ? candidateData.skills.join(',') : 
                     candidateData.skills_c || candidateData.skills || '',
            resumeSummary_c: candidateData.resumeSummary_c || candidateData.resumeSummary,
            availability_c: candidateData.availability_c || candidateData.availability || 'available'
          }
        ]
      };

      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create candidate ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating candidate:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async update(id, updateData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const updateRecord = {
        Id: parseInt(id)
      };

      // Only include updateable fields
      if (updateData.Name !== undefined) updateRecord.Name = updateData.Name;
      if (updateData.Tags !== undefined) updateRecord.Tags = updateData.Tags;
      if (updateData.email_c !== undefined) updateRecord.email_c = updateData.email_c;
      if (updateData.phone_c !== undefined) updateRecord.phone_c = updateData.phone_c;
      if (updateData.location_c !== undefined) updateRecord.location_c = updateData.location_c;
      if (updateData.currentJobTitle_c !== undefined) updateRecord.currentJobTitle_c = updateData.currentJobTitle_c;
      if (updateData.position_c !== undefined) updateRecord.position_c = updateData.position_c;
      if (updateData.status_c !== undefined) updateRecord.status_c = updateData.status_c;
      if (updateData.appliedAt_c !== undefined) updateRecord.appliedAt_c = updateData.appliedAt_c;
      if (updateData.experienceLevel_c !== undefined) updateRecord.experienceLevel_c = updateData.experienceLevel_c;
      if (updateData.skills_c !== undefined) {
        updateRecord.skills_c = Array.isArray(updateData.skills_c) ? 
          updateData.skills_c.join(',') : updateData.skills_c;
      }
      if (updateData.resumeSummary_c !== undefined) updateRecord.resumeSummary_c = updateData.resumeSummary_c;
      if (updateData.availability_c !== undefined) updateRecord.availability_c = updateData.availability_c;

      const params = {
        records: [updateRecord]
      };

      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update candidate ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating candidate:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete candidate ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting candidate:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
};